package recipes.chowdown.service.recipes;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.rdsdata.model.AWSRDSDataException;
import com.amazonaws.services.rdsdata.model.BadRequestException;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.domain.Tag;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.RecipeRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class PutRecipeUpdateServiceTest {

  @Mock
  private Context context;

  @Mock
  private LambdaLogger logger;

  @Mock
  private RecipeRepository repository;

  @Mock
  private CacheInvalidator cacheInvalidator;

  @Mock
  private GetRecipesService getRecipesService;

  @InjectMocks
  private PutRecipeUpdateService service;

  @Captor
  private ArgumentCaptor<String> recipeIdCaptor;

  @Captor
  private ArgumentCaptor<List<String>> deleteIdsCaptor;

  @Captor
  private ArgumentCaptor<List<String>> addIdsCaptor;

  @BeforeAll
  void beforeAll() {
    MockitoAnnotations.initMocks(this);

    this.service = new PutRecipeUpdateService();
  }

  @Test
  void handleRequest_shouldReturnPopulatedRecipeTag_whenNewRecipeTagPut() throws Exception {
    final Recipe existingWithNoTags = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Collections.singletonList(existingWithNoTags));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    final Tag newTag = Tag.builder().id("tagId123").build();
    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.singletonList(newTag)).build();

    final Recipe returnedRecipe = this.service.handleRequest(recipe, this.context);
    verify(this.repository).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(), addIdsCaptor.capture());

    assertEquals("recipeId123", recipeIdCaptor.getValue());
    assertTrue(deleteIdsCaptor.getValue().isEmpty());
    assertEquals(1, addIdsCaptor.getValue().size());
    assertTrue(addIdsCaptor.getValue().contains(newTag.getId()));
    assertEquals(1, returnedRecipe.getTags().size());
    assertTrue(returnedRecipe.getTags().contains(newTag));
  }

  @Test
  void handleRequest_shouldReturnPopulatedRecipeTag_whenExistingRecipeTagDeleted() throws Exception {
    final Tag oldTag = Tag.builder().id("tagId123").build();
    final Recipe existingWithOldTag = Recipe.builder().id("recipeId123").tags(Collections.singletonList(oldTag))
        .build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Collections.singletonList(existingWithOldTag));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    final Recipe returnedRecipe = this.service.handleRequest(recipe, this.context);
    verify(this.repository).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(), addIdsCaptor.capture());

    assertEquals("recipeId123", recipeIdCaptor.getValue());
    assertEquals(1, deleteIdsCaptor.getValue().size());
    assertTrue(deleteIdsCaptor.getValue().contains(oldTag.getId()));
    assertTrue(addIdsCaptor.getValue().isEmpty());
    assertTrue(returnedRecipe.getTags().isEmpty());
  }

  @Test
  void handleRequest_shouldReturnPopulatedRecipeTag_whenMultipleNewRecipeTagPut() throws Exception {
    final Recipe existingWithNoTags = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Collections.singletonList(existingWithNoTags));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    final Tag newTagOne = Tag.builder().id("tagId123").build();
    final Tag newTagTwo = Tag.builder().id("tagId456").build();
    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Arrays.asList(newTagOne, newTagTwo)).build();

    final Recipe returnedRecipe = this.service.handleRequest(recipe, this.context);
    verify(this.repository).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(), addIdsCaptor.capture());

    assertEquals("recipeId123", recipeIdCaptor.getValue());
    assertTrue(deleteIdsCaptor.getValue().isEmpty());
    assertEquals(2, addIdsCaptor.getValue().size());
    assertTrue(addIdsCaptor.getValue().contains(newTagOne.getId()));
    assertTrue(addIdsCaptor.getValue().contains(newTagTwo.getId()));
    assertEquals(2, returnedRecipe.getTags().size());
    assertTrue(returnedRecipe.getTags().contains(newTagOne));
    assertTrue(returnedRecipe.getTags().contains(newTagTwo));
  }

  @Test
  void handleRequest_shouldReturnPopulatedRecipeTag_whenMultipleExistingRecipeTagDeleted() throws Exception {
    final Tag oldTagOne = Tag.builder().id("tagId123").build();
    final Tag oldTagTwo = Tag.builder().id("tagId456").build();
    final Recipe existingWithOldTags = Recipe.builder().id("recipeId123").tags(Arrays.asList(oldTagOne, oldTagTwo))
        .build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Collections.singletonList(existingWithOldTags));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    final Recipe returnedRecipe = this.service.handleRequest(recipe, this.context);
    verify(this.repository).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(), addIdsCaptor.capture());

    assertEquals("recipeId123", recipeIdCaptor.getValue());
    assertEquals(2, deleteIdsCaptor.getValue().size());
    assertTrue(deleteIdsCaptor.getValue().contains(oldTagOne.getId()));
    assertTrue(deleteIdsCaptor.getValue().contains(oldTagTwo.getId()));
    assertTrue(addIdsCaptor.getValue().isEmpty());
    assertTrue(returnedRecipe.getTags().isEmpty());
  }

  @Test
  void handleRequest_shouldReturnPopulatedRecipeTag_whenMultipleNewRecipeTagPutButMoreExist() throws Exception {
    final Tag oldTagOne = Tag.builder().id("tagId123").build();
    final Tag oldTagTwo = Tag.builder().id("tagId456").build();
    final Recipe existingWithOldTags = Recipe.builder().id("recipeId123").tags(Arrays.asList(oldTagOne, oldTagTwo))
        .build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Collections.singletonList(existingWithOldTags));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    final Tag newTag = Tag.builder().id("tagId789").build();
    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.singletonList(newTag)).build();

    final Recipe returnedRecipe = this.service.handleRequest(recipe, this.context);
    verify(this.repository).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(), addIdsCaptor.capture());

    assertEquals("recipeId123", recipeIdCaptor.getValue());
    assertEquals(2, deleteIdsCaptor.getValue().size());
    assertTrue(deleteIdsCaptor.getValue().contains(oldTagOne.getId()));
    assertTrue(deleteIdsCaptor.getValue().contains(oldTagTwo.getId()));
    assertEquals(1, addIdsCaptor.getValue().size());
    assertTrue(addIdsCaptor.getValue().contains(newTag.getId()));
    assertEquals(1, returnedRecipe.getTags().size());
    assertTrue(returnedRecipe.getTags().contains(newTag));
  }

  @Test
  void handleRequest_shouldReturnPopulatedRecipeTag_whenMultipleNewRecipeTagPutButMoreExistAndSame() throws Exception {
    final Tag oldTagOne = Tag.builder().id("tagId123").build();
    final Tag oldTagTwo = Tag.builder().id("tagId456").build();
    final Recipe existingWithOldTags = Recipe.builder().id("recipeId123").tags(Arrays.asList(oldTagOne, oldTagTwo))
        .build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Collections.singletonList(existingWithOldTags));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    final Tag newTag = Tag.builder().id("tagId456").build();
    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.singletonList(newTag)).build();

    final Recipe returnedRecipe = this.service.handleRequest(recipe, this.context);
    verify(this.repository).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(), addIdsCaptor.capture());

    assertEquals("recipeId123", recipeIdCaptor.getValue());
    assertEquals(1, deleteIdsCaptor.getValue().size());
    assertTrue(deleteIdsCaptor.getValue().contains(oldTagOne.getId()));
    assertFalse(deleteIdsCaptor.getValue().contains(oldTagTwo.getId()));
    assertTrue(addIdsCaptor.getValue().isEmpty());
    assertFalse(addIdsCaptor.getValue().contains(newTag.getId()));
    assertEquals(1, returnedRecipe.getTags().size());
    assertTrue(returnedRecipe.getTags().contains(newTag));
  }

  @Test
  void handleRequest_shouldReturnPopulatedRecipeTag_whenMultipleNewRecipeTagPutButLessExist() throws Exception {
    final Tag oldTag = Tag.builder().id("tagId123").build();
    final Recipe existingWithOldTag = Recipe.builder().id("recipeId123").tags(Collections.singletonList(oldTag))
        .build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Collections.singletonList(existingWithOldTag));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    final Tag newTagOne = Tag.builder().id("tagId456").build();
    final Tag newTagTwo = Tag.builder().id("tagId789").build();
    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Arrays.asList(newTagOne, newTagTwo)).build();

    final Recipe returnedRecipe = this.service.handleRequest(recipe, this.context);
    verify(this.repository).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(), addIdsCaptor.capture());

    assertEquals("recipeId123", recipeIdCaptor.getValue());
    assertEquals(1, deleteIdsCaptor.getValue().size());
    assertTrue(deleteIdsCaptor.getValue().contains(oldTag.getId()));
    assertEquals(2, addIdsCaptor.getValue().size());
    assertTrue(addIdsCaptor.getValue().contains(newTagOne.getId()));
    assertTrue(addIdsCaptor.getValue().contains(newTagTwo.getId()));
    assertEquals(2, returnedRecipe.getTags().size());
    assertTrue(returnedRecipe.getTags().contains(newTagOne));
    assertTrue(returnedRecipe.getTags().contains(newTagTwo));
  }

  @Test
  void handleRequest_shouldReturnPopulatedRecipeTag_whenMultipleNewRecipeTagPutButLessExistAndSame() throws Exception {
    final Tag oldTag = Tag.builder().id("tagId123").build();
    final Recipe existingWithOldTag = Recipe.builder().id("recipeId123").tags(Collections.singletonList(oldTag))
        .build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Collections.singletonList(existingWithOldTag));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    final Tag newTagOne = Tag.builder().id("tagId123").build();
    final Tag newTagTwo = Tag.builder().id("tagId456").build();
    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Arrays.asList(newTagOne, newTagTwo)).build();

    final Recipe returnedRecipe = this.service.handleRequest(recipe, this.context);
    verify(this.repository).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(), addIdsCaptor.capture());

    assertEquals("recipeId123", recipeIdCaptor.getValue());
    assertTrue(deleteIdsCaptor.getValue().isEmpty());
    assertFalse(deleteIdsCaptor.getValue().contains(oldTag.getId()));
    assertEquals(1, addIdsCaptor.getValue().size());
    assertFalse(addIdsCaptor.getValue().contains(newTagOne.getId()));
    assertTrue(addIdsCaptor.getValue().contains(newTagTwo.getId()));
    assertEquals(2, returnedRecipe.getTags().size());
    assertTrue(returnedRecipe.getTags().contains(newTagOne));
    assertTrue(returnedRecipe.getTags().contains(newTagTwo));
  }

  @Test
  void handleRequest_shouldFindCorrectRecipe_whenMultipleNewRecipesReturned() throws Exception {
    final Recipe existingOne = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();
    final Recipe existingTwo = Recipe.builder().id("recipeId456").tags(Collections.emptyList()).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Arrays.asList(existingOne, existingTwo));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    this.service.handleRequest(recipe, this.context);
    verify(this.repository).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(), addIdsCaptor.capture());

    assertEquals("recipeId123", recipeIdCaptor.getValue());
  }

  @Test
  void handleRequest_shouldHandleRequest_whenNoRecipeWithIdFound() throws Exception {
    final Recipe existingOne = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();
    final Recipe existingTwo = Recipe.builder().id("recipeId456").tags(Collections.emptyList()).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class)))
        .thenReturn(Arrays.asList(existingOne, existingTwo));

    final Recipe recipe = Recipe.builder().id("not_found").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenNullTagsReturnedInExistingRecipe() throws Exception {
    final Recipe existing = Recipe.builder().id("recipeId123").build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenReturn(Collections.singletonList(existing));

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenNullTagsReturnedInPassedRecipe() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    final Recipe recipe = Recipe.builder().id("recipeId123").build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenNullRecipeIdReturnedInExistingRecipe() throws Exception {
    final Recipe existing = Recipe.builder().tags(Collections.emptyList()).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenReturn(Collections.singletonList(existing));

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenNullRecipeIdReturnedInPassedRecipe() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    final Recipe recipe = Recipe.builder().tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenEmptyRecipeIdReturnedInExistingRecipe() throws Exception {
    final Recipe existing = Recipe.builder().id("").tags(Collections.emptyList()).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenReturn(Collections.singletonList(existing));

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenEmptyRecipeIdReturnedInPassedRecipe() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    final Recipe recipe = Recipe.builder().id("").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenNullTagIdReturnedInExistingRecipe() throws Exception {
    final Tag oldTag = Tag.builder().build();
    final Recipe existing = Recipe.builder().id("recipeId123").tags(Collections.singletonList(oldTag)).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenReturn(Collections.singletonList(existing));

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenNullTagIdReturnedInPassedRecipe() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    final Tag newTag = Tag.builder().build();
    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.singletonList(newTag)).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenEmptyTagIdReturnedInExistingRecipe() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenEmptyTagIdReturnedInPassedRecipe() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    final Tag newTag = Tag.builder().id("").build();
    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.singletonList(newTag)).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
    verify(this.repository, never()).putRecipeTags(recipeIdCaptor.capture(), deleteIdsCaptor.capture(),
        addIdsCaptor.capture());
  }

  @Test
  void handleRequest_shouldThrowException_whenRepositoryThrowsExceptionGettingRecipes() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenThrow(IllegalArgumentException.class);

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenRepositoryThrowsExceptionPuttingTags() throws Exception {
    final Recipe existing = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenReturn(Collections.singletonList(existing));
    doThrow(IllegalArgumentException.class).when(this.repository).putRecipeTags(Mockito.anyString(), Mockito.anyList(),
        Mockito.anyList());

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotCommunicateWithDbToGetRecipes() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenThrow(BadRequestException.class);

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotCommunicateWithDbToPutTags() throws Exception {
    final Recipe existing = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenReturn(Collections.singletonList(existing));
    doThrow(BadRequestException.class).when(this.repository).putRecipeTags(Mockito.anyString(), Mockito.anyList(),
        Mockito.anyList());

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    assertThrows(ServerException.class, () -> this.service.handleRequest(recipe, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotAuthenticateWithDbToGetRecipes() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenThrow(new AWSRDSDataException(
        "arn:aws:ACCOUNT_NUMBER/role is not authorized to perform: <action> on resource: arn:aws:ACCOUNT_NUMBER/resource"));

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(recipe, this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
    assertFalse(returnedException.getMessage().contains("ACCOUNT_NUMBER"));
    assertFalse(returnedException.getMessage().contains("is not authorized to perform"));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotAuthenticateWithDbToPutTags() throws Exception {
    final Recipe existing = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.getRecipesService.getRecipes(Mockito.any(Context.class))).thenReturn(Collections.singletonList(existing));
    doThrow(new AWSRDSDataException(
        "arn:aws:ACCOUNT_NUMBER/role is not authorized to perform: <action> on resource: arn:aws:ACCOUNT_NUMBER/resource"))
            .when(this.repository).putRecipeTags(Mockito.anyString(), Mockito.anyList(), Mockito.anyList());

    final Recipe recipe = Recipe.builder().id("recipeId123").tags(Collections.emptyList()).build();

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(recipe, this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
    assertFalse(returnedException.getMessage().contains("ACCOUNT_NUMBER"));
    assertFalse(returnedException.getMessage().contains("is not authorized to perform"));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullRecipePut() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(null, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullContext() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(new Recipe(), null));
  }

  @Test
  void handleRequest_shouldThrowException_whenAllNullInput() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(null, null));
  }
}