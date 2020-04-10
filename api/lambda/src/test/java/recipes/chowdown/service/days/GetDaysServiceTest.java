package recipes.chowdown.service.days;

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

import recipes.chowdown.domain.Day;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.DayRepository;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class GetDaysServiceTest {

  @Mock
  private Context context;

  @Mock
  private LambdaLogger logger;

  @Mock
  private DayRepository repository;

  @InjectMocks
  private GetDaysService service;

  private GetRequest getRequest;

  @BeforeAll
  void beforeAll() {
    MockitoAnnotations.initMocks(this);

    this.getRequest = new GetRequest();
    this.getRequest.setFrom("20200401");
    this.getRequest.setTo("20200401");

    this.service = new GetDaysService();
  }

  @Test
  void handleRequest_shouldReturnDayInCorrectStructure_whenValidRequest() throws Exception {
    Field date = new Field();
    date.setStringValue("2020-04-01");
    Field title = new Field();
    title.setStringValue("a lovely recipe");
    Field rating = new Field();
    rating.setLongValue(5l);
    Field image = new Field();
    image.setStringValue("/image/url/123");
    Field quantity = new Field();
    quantity.setDoubleValue(4d);
    Field unitSingularName = new Field();
    unitSingularName.setStringValue("tin");
    Field unitPluralName = new Field();
    unitPluralName.setStringValue("tins");
    Field ingredientName = new Field();
    ingredientName.setStringValue("tomatoes");

    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    List<Field> columns = Arrays.asList(date, title, rating, image, quantity, unitSingularName, unitPluralName,
        ingredientName);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(1, returnedDays.size());
    assertEquals("20200401", returnedDays.get(0).getDate());
    assertEquals("a lovely recipe", returnedDays.get(0).getRecipe().getTitle());
    assertEquals(5, returnedDays.get(0).getRecipe().getRating());
    assertEquals("/image/url/123", returnedDays.get(0).getRecipe().getImage());
    assertEquals(4, returnedDays.get(0).getRecipe().getIngredients().get(0).getQuantity());
    assertEquals("tin", returnedDays.get(0).getRecipe().getIngredients().get(0).getUnitSingularName());
    assertEquals("tins", returnedDays.get(0).getRecipe().getIngredients().get(0).getUnitPluralName());
    assertEquals("tomatoes", returnedDays.get(0).getRecipe().getIngredients().get(0).getIngredientName());
  }

  @Test
  void handleRequest_shouldReturnTwoDays_whenMultipleDatesReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    Field dateOne = new Field();
    dateOne.setStringValue("2020-04-01");
    Field dateTwo = new Field();
    dateTwo.setStringValue("2020-04-02");
    List<Field> columnsOne = Arrays.asList(dateOne, mockField, mockField, mockField, mockField, mockField, mockField,
        mockField);
    List<Field> columnsTwo = Arrays.asList(dateTwo, mockField, mockField, mockField, mockField, mockField, mockField,
        mockField);
    List<List<Field>> rows = Arrays.asList(columnsOne, columnsTwo);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(2, returnedDays.size());
  }

  @Test
  void handleRequest_shouldReturnISODateFormat_whenDbReturnsDifferentDateFormat() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    Field date = new Field();
    date.setStringValue("2020-04-01");
    List<Field> columns = Arrays.asList(date, mockField, mockField, mockField, mockField, mockField, mockField,
        mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(1, returnedDays.size());
    assertEquals("20200401", returnedDays.get(0).getDate());
  }

  @Test
  void handleRequest_shouldReturnDay_whenValidFromAndValidTo() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    Field date = new Field();
    date.setStringValue("2020-04-01");
    List<Field> columns = Arrays.asList(date, mockField, mockField, mockField, mockField, mockField, mockField,
        mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(1, returnedDays.size());
  }

  @Test
  void handleRequest_shouldThrowException_whenEmptyFromAndValidTo() throws Exception {
    GetRequest getRequestInvalid = new GetRequest();
    getRequestInvalid.setFrom("");
    getRequestInvalid.setTo("20200401");

    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(getRequestInvalid, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullFromAndValidTo() throws Exception {
    GetRequest getRequestInvalid = new GetRequest();
    getRequestInvalid.setFrom(null);
    getRequestInvalid.setTo("20200401");

    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(getRequestInvalid, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenBadFromAndValidTo() throws Exception {
    GetRequest getRequestInvalid = new GetRequest();
    getRequestInvalid.setFrom("not_a_date");
    getRequestInvalid.setTo("20200401");

    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(getRequestInvalid, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenValidFromAndEmptyTo() throws Exception {
    GetRequest getRequestInvalid = new GetRequest();
    getRequestInvalid.setFrom("20200401");
    getRequestInvalid.setTo("");

    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(getRequestInvalid, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenValidFromAndNullTo() throws Exception {
    GetRequest getRequestInvalid = new GetRequest();
    getRequestInvalid.setFrom("20200401");
    getRequestInvalid.setTo(null);

    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(getRequestInvalid, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenValidFromAndBadTo() throws Exception {
    GetRequest getRequestInvalid = new GetRequest();
    getRequestInvalid.setFrom("20200401");
    getRequestInvalid.setTo("not_a_date");

    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(getRequestInvalid, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenEmptyBoth() throws Exception {
    GetRequest getRequestInvalid = new GetRequest();
    getRequestInvalid.setFrom("");
    getRequestInvalid.setTo("");

    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(getRequestInvalid, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullBoth() throws Exception {
    GetRequest getRequestInvalid = new GetRequest();
    getRequestInvalid.setFrom(null);
    getRequestInvalid.setTo(null);

    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(getRequestInvalid, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenBadBoth() throws Exception {
    GetRequest getRequestInvalid = new GetRequest();
    getRequestInvalid.setFrom("not_a_date");
    getRequestInvalid.setTo("not_a_date");

    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(getRequestInvalid, this.context));
  }

  @Test
  void handleRequest_shouldReturnDay_whenExistsSingle() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    Field date = new Field();
    date.setStringValue("2020-04-01");
    List<Field> columns = Arrays.asList(date, mockField, mockField, mockField, mockField, mockField, mockField,
        mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");
    when(mockField.getLongValue()).thenReturn(123l);

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(1, returnedDays.size());
    assertEquals("20200401", returnedDays.get(0).getDate());
    assertEquals("fake", returnedDays.get(0).getRecipe().getTitle());
    assertEquals(123l, returnedDays.get(0).getRecipe().getRating());
  }

  @Test
  void handleRequest_shouldReturnDays_whenExistsMultipleWithSameDate() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField, mockField, mockField,
        mockField);
    List<List<Field>> rows = Arrays.asList(columns, columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("2020-04-01");

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(1, returnedDays.size());
  }

  @Test
  void handleRequest_shouldNotReturnDays_whenNoDaysExist() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(Collections.emptyList());

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(0, returnedDays.size());
  }

  @Test
  void handleRequest_shouldThrowException_whenTooFewRowsReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);

    // only return one column (id) and not recipe columns
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    assertThrows(ServerException.class, () -> this.service.handleRequest(this.getRequest, this.context));
  }

  @Test
  void handleRequest_shouldReturnDay_whenTooManyRowsReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    Field date = new Field();
    date.setStringValue("2020-04-01");

    // return nine columns (too many for query)
    List<Field> columns = Arrays.asList(date, mockField, mockField, mockField, mockField, mockField, mockField,
        mockField, mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(1, returnedDays.size());
    assertEquals("20200401", returnedDays.get(0).getDate());
    assertEquals("fake", returnedDays.get(0).getRecipe().getTitle());
  }

  @Test
  void handleRequest_shouldReturnDay_whenNoRowDataReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    Field date = new Field();
    date.setStringValue("2020-04-01");
    List<Field> columns = Arrays.asList(date, mockField, mockField, mockField, mockField, mockField, mockField,
        mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("");

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(1, returnedDays.size());
    assertEquals("20200401", returnedDays.get(0).getDate());
    assertEquals("", returnedDays.get(0).getRecipe().getTitle());
  }

  @Test
  void handleRequest_shouldReturnDay_whenNullReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    Field date = new Field();
    date.setStringValue("2020-04-01");
    List<Field> columns = Arrays.asList(date, mockField, mockField, mockField, mockField, mockField, mockField,
        mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn(null);

    List<Day> returnedDays = this.service.handleRequest(this.getRequest, this.context);

    assertEquals(1, returnedDays.size());
    assertNull(returnedDays.get(0).getRecipe().getTitle());
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotCommunicateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo()))
        .thenThrow(BadRequestException.class);

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(this.getRequest, this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotAuthenticateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getDays(this.getRequest.getFrom(), this.getRequest.getTo())).thenThrow(new AWSRDSDataException(
        "arn:aws:ACCOUNT_NUMBER/role is not authorized to perform: <action> on resource: arn:aws:ACCOUNT_NUMBER/resource"));

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(this.getRequest, this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
    assertFalse(returnedException.getMessage().contains("ACCOUNT_NUMBER"));
    assertFalse(returnedException.getMessage().contains("is not authorized to perform"));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullInputObject() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(null, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullContext() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(this.getRequest, null));
  }

  @Test
  void handleRequest_shouldThrowException_whenAllNullInput() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(null, null));
  }
}