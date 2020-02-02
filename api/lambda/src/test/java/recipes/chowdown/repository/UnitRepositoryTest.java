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

import recipes.chowdown.domain.Unit;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class UnitRepositoryTest {

    @Mock
    private AWSRDSData rdsData;

    @InjectMocks
    private UnitRepository repository;

    @BeforeAll
    void beforeAll() {
        MockitoAnnotations.initMocks(this);

        this.repository = new UnitRepository();
    }

    @Test
    void getUnits_shouldReturnResults_whenRequestValid() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

        ExecuteStatementResult result = this.repository.getUnits();

        assertEquals(mockResult, result);
    }

    @Test
    void getUnits_shouldNotReturnResults_whenRequestInvalid() throws Exception {
        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(null);

        ExecuteStatementResult result = this.repository.getUnits();

        assertNull(result);
    }

    @Test
    void putUnit_shouldReturnResults_whenRequestValidUnit() throws Exception {
        Unit unit = Unit.builder().singular("cup").plural("cups").build();
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

        ExecuteStatementResult result = this.repository.putUnit(unit);

        assertEquals(mockResult, result);
    }

    @Test
    void putUnit_shouldReturnResults_whenRequestInvalidUnit() throws Exception {
        Unit unit = Unit.builder().build();
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

        ExecuteStatementResult result = this.repository.putUnit(unit);

        assertEquals(mockResult, result);
    }

    @Test
    void putUnit_shouldThrowException_whenRequestNullUnit() throws Exception {
        ResourceNotPersistedException returnedException = assertThrows(ResourceNotPersistedException.class,
                () -> this.repository.putUnit(null));
        assertTrue(returnedException.getMessage().contains("part or all of the input Unit was null"));
    }
}