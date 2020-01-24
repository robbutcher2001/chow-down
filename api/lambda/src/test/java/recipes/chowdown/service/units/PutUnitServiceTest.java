package recipes.chowdown.service.units;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
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

import recipes.chowdown.domain.Unit;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.UnitRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class PutUnitServiceTest {

    @Mock
    private Context context;

    @Mock
    private LambdaLogger logger;

    @Mock
    private UnitRepository repository;

    @Mock
    private CacheInvalidator cacheInvalidator;

    @InjectMocks
    private PutUnitService service;

    @BeforeAll
    void beforeAll() {
        MockitoAnnotations.initMocks(this);

        this.service = new PutUnitService();
    }

    @Test
    void handleRequest_shouldReturnPopulatedUnit_whenNewUnitPut() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putUnit(Mockito.any(Unit.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake_id");
        when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

        Unit returnedUnit = this.service.handleRequest(new Unit(), this.context);

        assertEquals("fake_id", returnedUnit.getId());
    }

    @Test
    void handleRequest_shouldThrowException_whenMultipleUnitPut() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = new ArrayList<>();

        // Fake two rows returned
        rows.add(columns);
        rows.add(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putUnit(Mockito.any(Unit.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Unit(), this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenNoUnitPut() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putUnit(Mockito.any(Unit.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(Collections.emptyList());

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Unit(), this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenNoIdReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putUnit(Mockito.any(Unit.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("");

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Unit(), this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenNullReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putUnit(Mockito.any(Unit.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn(null);

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Unit(), this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenNullUnitPut() throws Exception {
        when(this.context.getLogger()).thenReturn(this.logger);

        assertThrows(ServerException.class, () -> this.service.handleRequest(null, this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenNullContent() throws Exception {
        assertThrows(ServerException.class, () -> this.service.handleRequest(new Unit(), null));
    }

    @Test
    void handleRequest_shouldThrowException_whenAllNullInput() throws Exception {
        assertThrows(ServerException.class, () -> this.service.handleRequest(null, null));
    }
}