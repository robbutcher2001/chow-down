package recipes.chowdown.service.recipes;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.rdsdata.model.AWSRDSDataException;
import com.amazonaws.services.rdsdata.model.BadRequestException;
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

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.RecipeRepository;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class GetRecipesServiceTest {

  @Mock
  private Context context;

  @Mock
  private LambdaLogger logger;

  @Mock
  private RecipeRepository repository;

  @InjectMocks
  private GetRecipesService service;

  private Field createdDate;

  @BeforeAll
  void beforeAll() {
    MockitoAnnotations.initMocks(this);

    this.createdDate = new Field();
    this.createdDate.setStringValue("2020-06-01 14:00:10");

    this.service = new GetRecipesService();
  }

  @Test
  void handleRequest_shouldReturnRecipe_whenExistsSingle() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField, mockField,
        this.createdDate);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Recipe> returnedRecipes = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedRecipes.size());
  }

  @Test
  void handleRequest_shouldReturnRecipes_whenExistsMultiple() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField, mockField,
        this.createdDate);
    List<List<Field>> rows = Arrays.asList(columns, columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Recipe> returnedRecipes = this.service.handleRequest(new Object(), this.context);

    assertEquals(2, returnedRecipes.size());
  }

  @Test
  void handleRequest_shouldReturnCorrectCreatedDate_whenBritishSummerTime() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    this.createdDate.setStringValue("2020-06-01 14:00:10");

    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField, mockField,
        this.createdDate);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Recipe> returnedRecipes = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedRecipes.size());
    assertEquals("2020-06-01T15:00:10+01:00", returnedRecipes.get(0).getCreatedDate());
  }

  @Test
  void handleRequest_shouldReturnCorrectCreatedDate_whenNotBritishSummerTime() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    this.createdDate.setStringValue("2020-01-01 14:00:10");

    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField, mockField,
        this.createdDate);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Recipe> returnedRecipes = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedRecipes.size());
    assertEquals("2020-01-01T14:00:10Z", returnedRecipes.get(0).getCreatedDate());
  }

  @Test
  void handleRequest_shouldNotReturnRecipes_whenNoRecipesExist() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(Collections.emptyList());

    List<Recipe> returnedRecipes = this.service.handleRequest(new Object(), this.context);

    assertEquals(0, returnedRecipes.size());
  }

  @Test
  void handleRequest_shouldThrowException_whenTooFewRowsReturnedFromDb() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);

    // only return one column (id) and no other recipe fields
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(rows);

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Object(), this.context));
  }

  @Test
  void handleRequest_shouldReturnRecipe_whenTooManyRowsReturnedFromDb() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);

    // return eight columns (too many for query)
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField, mockField,
        this.createdDate, mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");
    when(mockField.getLongValue()).thenReturn(123l);

    List<Recipe> returnedRecipes = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedRecipes.size());
    assertEquals("fake", returnedRecipes.get(0).getId());
    assertEquals("fake", returnedRecipes.get(0).getTitle());
    assertEquals("fake", returnedRecipes.get(0).getDescription());
    assertEquals(123l, returnedRecipes.get(0).getRating());
    assertEquals("fake", returnedRecipes.get(0).getUrl());
    assertEquals("fake", returnedRecipes.get(0).getImage());
  }

  @Test
  void handleRequest_shouldReturnRecipe_whenNoRowDataReturnedFromDb() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField, mockField,
        this.createdDate);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("");
    when(mockField.getLongValue()).thenReturn(0l);

    List<Recipe> returnedRecipes = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedRecipes.size());
    assertEquals("", returnedRecipes.get(0).getId());
    assertEquals("", returnedRecipes.get(0).getTitle());
    assertEquals("", returnedRecipes.get(0).getDescription());
    assertEquals(0l, returnedRecipes.get(0).getRating());
    assertEquals("", returnedRecipes.get(0).getUrl());
    assertEquals("", returnedRecipes.get(0).getImage());
  }

  @Test
  void handleRequest_shouldReturnRecipe_whenNullReturnedFromDb() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField, mockField,
        this.createdDate);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn(null);
    when(mockField.getLongValue()).thenReturn(null);

    List<Recipe> returnedRecipes = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedRecipes.size());
    assertNull(returnedRecipes.get(0).getId());
    assertNull(returnedRecipes.get(0).getTitle());
    assertNull(returnedRecipes.get(0).getDescription());
    assertNull(returnedRecipes.get(0).getRating());
    assertNull(returnedRecipes.get(0).getUrl());
    assertNull(returnedRecipes.get(0).getImage());
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotCommunicateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenThrow(BadRequestException.class);

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(new Object(), this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotAuthenticateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenThrow(new AWSRDSDataException(
        "arn:aws:ACCOUNT_NUMBER/role is not authorized to perform: <action> on resource: arn:aws:ACCOUNT_NUMBER/resource"));

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(new Object(), this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
    assertFalse(returnedException.getMessage().contains("ACCOUNT_NUMBER"));
    assertFalse(returnedException.getMessage().contains("is not authorized to perform"));
  }

  @Test
  void handleRequest_shouldReturnRecipe_whenNullInputObject() throws Exception {
    ExecuteStatementResult mockRecipeResult = Mockito.mock(ExecuteStatementResult.class);
    ExecuteStatementResult mockTagResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField, mockField,
        this.createdDate);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getRecipes()).thenReturn(mockRecipeResult);
    when(this.repository.getRecipeTags()).thenReturn(mockTagResult);
    when(mockRecipeResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Recipe> returnedRecipes = this.service.handleRequest(null, this.context);

    assertEquals(1, returnedRecipes.size());
  }

  @Test
  void handleRequest_shouldThrowException_whenNullContext() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(new Object(), null));
  }

  @Test
  void handleRequest_shouldThrowException_whenAllNullInput() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(null, null));
  }
}