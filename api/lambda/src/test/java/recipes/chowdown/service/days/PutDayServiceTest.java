package recipes.chowdown.service.days;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
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
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class PutDayServiceTest {

  @Mock
  private Context context;

  @Mock
  private LambdaLogger logger;

  @Mock
  private DayRepository repository;

  @Mock
  private CacheInvalidator cacheInvalidator;

  @Mock
  private GetDaysService getDaysService;

  @InjectMocks
  private PutDayService service;

  @BeforeAll
  void beforeAll() {
    MockitoAnnotations.initMocks(this);

    this.service = new PutDayService();
  }

  @Test
  void handleRequest_shouldReturnPopulatedDay_whenNewDayPut() throws Exception {
    Day day = Day.builder().date("20200412").recipeId("fake_id").build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_date");
    when(this.getDaysService.getDays(day.getDate(), day.getDate(), this.context))
        .thenReturn(Collections.singletonList(Day.builder().date("20200412").recipeId("fake_id").build()));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    Day returnedDay = this.service.handleRequest(day, this.context);

    assertNotNull(returnedDay.getDate());
    assertNotNull(returnedDay.getRecipeId());
  }

  @Test
  void handleRequest_shouldThrowException_whenMultipleDayPut() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = new ArrayList<>();

    // Fake two rows returned
    rows.add(columns);
    rows.add(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Day(), this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenMultipleDayGet() throws Exception {
    Day day = Day.builder().date("20200412").recipeId("fake_id").build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_date");
    when(this.getDaysService.getDays(day.getDate(), day.getDate(), this.context))
        .thenReturn(Arrays.asList(Day.builder().date("20200412").recipeId("fake_id").build(),
            Day.builder().date("20200412").recipeId("fake_id").build()));

    assertThrows(ServerException.class, () -> this.service.handleRequest(day, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNoDayPut() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(Collections.emptyList());

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Day(), this.context));
  }

  @Test
  void handleRequest_shouldReturnEmptyDay_whenValidResetPut() throws Exception {
    Day day = Day.builder().date("20200412").build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_date");
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    Day returnedDay = this.service.handleRequest(day, this.context);

    assertEquals(day, returnedDay);
    assertNotNull(returnedDay.getDate());
    assertNull(returnedDay.getRecipeId());
    assertNull(returnedDay.getRecipe());
  }

  @Test
  void handleRequest_shouldReturnEmptyDay_whenInvalidResetPut() throws Exception {
    Day day = Day.builder().date("20200412").recipeId("not_valid").build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_date");
    when(this.getDaysService.getDays(day.getDate(), day.getDate(), this.context))
        .thenReturn(Collections.singletonList(Day.builder().date("20200412").recipeId("not_valid").build()));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    Day returnedDay = this.service.handleRequest(day, this.context);

    assertNotNull(returnedDay.getDate());
    assertNotNull(returnedDay.getRecipeId());
  }

  @Test
  void handleRequest_shouldReturnEmptyDay_whenValidAlternateDayPut() throws Exception {
    Day day = Day.builder().date("20200412").alternateDay("BBQ day").build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_date");
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    Day returnedDay = this.service.handleRequest(day, this.context);

    assertEquals(day, returnedDay);
    assertNotNull(returnedDay.getDate());
    assertNotNull(returnedDay.getAlternateDay());
    assertNull(returnedDay.getRecipeId());
    assertNull(returnedDay.getRecipe());
  }

  @Test
  void handleRequest_shouldReturnEmptyDay_whenInvalidAlternateDayPut() throws Exception {
    Day day = Day.builder().date("20200412").recipeId("not_valid").build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_date");
    when(this.getDaysService.getDays(day.getDate(), day.getDate(), this.context))
        .thenReturn(Collections.singletonList(Day.builder().date("20200412").recipeId("not_valid").build()));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    Day returnedDay = this.service.handleRequest(day, this.context);

    assertNotNull(returnedDay.getDate());
    assertNull(returnedDay.getAlternateDay());
    assertNotNull(returnedDay.getRecipeId());
  }

  @Test
  void handleRequest_shouldReturnEmptyDay_whenValidRecipeIdAndAlternateDayPut() throws Exception {
    Day day = Day.builder().date("20200412").recipeId("not_valid").alternateDay("BBQ day").build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_date");
    when(this.getDaysService.getDays(day.getDate(), day.getDate(), this.context))
        .thenReturn(Collections.singletonList(Day.builder().date("20200412").recipeId("not_valid").build()));
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    Day returnedDay = this.service.handleRequest(day, this.context);

    assertNotEquals(day, returnedDay);
    assertNotNull(returnedDay.getDate());
    assertNull(returnedDay.getAlternateDay());
    assertNotNull(returnedDay.getRecipeId());
  }

  @Test
  void handleRequest_shouldThrowException_whenNoIdReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("");

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Day(), this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn(null);

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Day(), this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotCommunicateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenThrow(BadRequestException.class);

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(new Day(), this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotAuthenticateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putDay(Mockito.any(Day.class))).thenThrow(new AWSRDSDataException(
        "arn:aws:ACCOUNT_NUMBER/role is not authorized to perform: <action> on resource: arn:aws:ACCOUNT_NUMBER/resource"));

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(new Day(), this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
    assertFalse(returnedException.getMessage().contains("ACCOUNT_NUMBER"));
    assertFalse(returnedException.getMessage().contains("is not authorized to perform"));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullDayPut() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(null, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullContext() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(new Day(), null));
  }

  @Test
  void handleRequest_shouldThrowException_whenAllNullInput() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(null, null));
  }
}