package recipes.chowdown.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

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
import recipes.chowdown.exceptions.ResourceNotPersistedException;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class DayRepositoryTest {

  @Mock
  private AWSRDSData rdsData;

  @InjectMocks
  private DayRepository repository;

  @BeforeAll
  void beforeAll() {
    MockitoAnnotations.initMocks(this);

    this.repository = new DayRepository();
  }

  @Test
  void getDays_shouldReturnResults_whenRequestValid() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

    ExecuteStatementResult result = this.repository.getDays("20200401", "20200401");

    assertEquals(mockResult, result);
  }

  @Test
  void getDays_shouldNotReturnResults_whenRequestInvalid() throws Exception {
    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(null);

    ExecuteStatementResult result = this.repository.getDays(null, null);

    assertNull(result);
  }

  @Test
  void putDay_shouldReturnResults_whenRequestValidDay() throws Exception {
    Day day = Day.builder().date("20200401").recipeId("123").build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

    ExecuteStatementResult result = this.repository.putDay(day);

    assertEquals(mockResult, result);
  }

  @Test
  void putDay_shouldReturnResults_whenRequestInvalidDay() throws Exception {
    Day day = Day.builder().build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

    ExecuteStatementResult result = this.repository.putDay(day);

    assertEquals(mockResult, result);
  }

  @Test
  void putDay_shouldReturnResults_whenRequestValidReset() throws Exception {
    Day day = Day.builder().date("20200401").build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

    ExecuteStatementResult result = this.repository.putDay(day);

    assertEquals(mockResult, result);
  }

  @Test
  void putDay_shouldThrowException_whenRequestNullDay() throws Exception {
    ResourceNotPersistedException returnedException = assertThrows(ResourceNotPersistedException.class,
        () -> this.repository.putDay(null));
    assertTrue(returnedException.getMessage().contains("part or all of the input Day was null"));
  }
}