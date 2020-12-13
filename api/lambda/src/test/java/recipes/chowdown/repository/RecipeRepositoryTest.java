package recipes.chowdown.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.model.BeginTransactionRequest;
import com.amazonaws.services.rdsdata.model.BeginTransactionResult;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import recipes.chowdown.domain.Ingredient;
import recipes.chowdown.domain.Recipe;
import recipes.chowdown.domain.RecipeIngredient;
import recipes.chowdown.domain.Unit;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class RecipeRepositoryTest {

  @Mock
  private AWSRDSData rdsData;

  @InjectMocks
  private RecipeRepository repository;

  @BeforeAll
  void beforeAll() {
    MockitoAnnotations.initMocks(this);

    this.repository = new RecipeRepository();
  }

  @Test
  void getRecipes_shouldReturnResults_whenRequestValid() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

    ExecuteStatementResult result = this.repository.getRecipes();

    assertEquals(mockResult, result);
  }

  @Test
  void getRecipes_shouldNotReturnResults_whenRequestInvalid() throws Exception {
    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(null);

    ExecuteStatementResult result = this.repository.getRecipes();

    assertNull(result);
  }

  @Test
  void postRecipe_shouldReturnResults_whenRequestValidRecipe() throws Exception {
    List<RecipeIngredient> recipeIngredients = Collections
        .singletonList(RecipeIngredient.builder().quantity(2l).unit(Unit.builder().id("unit_id").build())
            .ingredient(Ingredient.builder().id("ingredient_id").build()).build());
    Recipe recipe = Recipe.builder().title("katsu curry").description("good food").rating(5l).url("url").image("src")
        .createdDate(LocalDateTime.now().toString()).ingredients(recipeIngredients).build();
    BeginTransactionResult mockBeginTransaction = Mockito.mock(BeginTransactionResult.class);
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.rdsData.beginTransaction(Mockito.any(BeginTransactionRequest.class))).thenReturn(mockBeginTransaction);
    when(mockBeginTransaction.getTransactionId()).thenReturn("mockTransactionId");
    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_id");

    ExecuteStatementResult result = this.repository.postRecipe(recipe);

    assertEquals(mockResult, result);
  }

  @Test
  void postRecipe_shouldThrowException_whenRequestInvalidRecipeTitle() throws Exception {
    Recipe recipe = Recipe.builder().build();
    BeginTransactionResult mockBeginTransaction = Mockito.mock(BeginTransactionResult.class);

    when(this.rdsData.beginTransaction(Mockito.any(BeginTransactionRequest.class))).thenReturn(mockBeginTransaction);
    when(mockBeginTransaction.getTransactionId()).thenReturn("mockTransactionId");

    IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
        () -> this.repository.postRecipe(recipe));
    assertTrue(returnedException.getMessage().contains("recipe or recipe title cannot be null or empty"));
  }

  @Test
  void postRecipe_shouldThrowException_whenRequestInvalidRecipeIngredients() throws Exception {
    Recipe recipe = Recipe.builder().title("fake_title").description("fake_description").url("fake_url").build();
    BeginTransactionResult mockBeginTransaction = Mockito.mock(BeginTransactionResult.class);
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.rdsData.beginTransaction(Mockito.any(BeginTransactionRequest.class))).thenReturn(mockBeginTransaction);
    when(mockBeginTransaction.getTransactionId()).thenReturn("mockTransactionId");
    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_id");

    ResourceNotPersistedException returnedException = assertThrows(ResourceNotPersistedException.class,
        () -> this.repository.postRecipe(recipe));
    assertTrue(returnedException.getMessage().contains("part or all of the input Recipe Ingredient was null"));
  }

  @Test
  void postRecipe_shouldThrowException_whenRequestNullRecipe() throws Exception {
    BeginTransactionResult mockBeginTransaction = Mockito.mock(BeginTransactionResult.class);

    when(this.rdsData.beginTransaction(Mockito.any(BeginTransactionRequest.class))).thenReturn(mockBeginTransaction);
    when(mockBeginTransaction.getTransactionId()).thenReturn("mockTransactionId");

    IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
        () -> this.repository.postRecipe(null));
    assertTrue(returnedException.getMessage().contains("recipe or recipe title cannot be null or empty"));
  }

  @Test
  void postRecipe_shouldThrowException_whenTransactionIdEmpty() throws Exception {
    Recipe recipe = Recipe.builder().build();
    BeginTransactionResult mockBeginTransaction = Mockito.mock(BeginTransactionResult.class);

    when(this.rdsData.beginTransaction(Mockito.any(BeginTransactionRequest.class))).thenReturn(mockBeginTransaction);
    when(mockBeginTransaction.getTransactionId()).thenReturn("");

    IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
        () -> this.repository.postRecipe(recipe));
    assertTrue(returnedException.getMessage().contains("transactionId cannot be null or empty"));
  }

  @Test
  void postRecipe_shouldThrowException_whenTransactionIdNull() throws Exception {
    Recipe recipe = Recipe.builder().build();
    BeginTransactionResult mockBeginTransaction = Mockito.mock(BeginTransactionResult.class);

    when(this.rdsData.beginTransaction(Mockito.any(BeginTransactionRequest.class))).thenReturn(mockBeginTransaction);
    when(mockBeginTransaction.getTransactionId()).thenReturn(null);

    IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
        () -> this.repository.postRecipe(recipe));
    assertTrue(returnedException.getMessage().contains("transactionId cannot be null or empty"));
  }
}