package recipes.chowdown.service.units;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
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

import recipes.chowdown.domain.Unit;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.UnitRepository;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class GetUnitsServiceTest {

    @Mock
    private Context context;

    @Mock
    private LambdaLogger logger;

    @Mock
    private UnitRepository repository;

    @InjectMocks
    private GetUnitsService service;

    @BeforeAll
    void beforeAll() {
        MockitoAnnotations.initMocks(this);

        this.service = new GetUnitsService();
    }

    @Test
    void handleRequest_shouldReturnUnit_whenExistsSingle() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getUnits()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        List<Unit> returnedUnits = this.service.handleRequest(new Object(), this.context);

        assertEquals(1, returnedUnits.size());
    }

    @Test
    void handleRequest_shouldReturnUnits_whenExistsMultiple() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField, mockField);
        List<List<Field>> rows = Arrays.asList(columns, columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getUnits()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        List<Unit> returnedUnits = this.service.handleRequest(new Object(), this.context);

        assertEquals(2, returnedUnits.size());
    }

    @Test
    void handleRequest_shouldThrowException_whenNoUnitsExist() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getUnits()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(Collections.emptyList());

        // TODO: see PutIngredientService, need to put this in APIG
        // assertThrows(ResourcesNotFoundException.class, () ->
        // this.service.handleRequest(new Object(), this.context));
        assertThrows(ServerException.class, () -> this.service.handleRequest(new Object(), this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenTooFewRowsReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);

        // only return one column (id) and no other unit fields
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getUnits()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Object(), this.context));
    }

    @Test
    void handleRequest_shouldReturnUnit_whenTooManyRowsReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);

        // return four columns (too many for query)
        List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getUnits()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        List<Unit> returnedUnits = this.service.handleRequest(new Object(), this.context);

        assertEquals(1, returnedUnits.size());
        assertEquals("fake", returnedUnits.get(0).getId());
        assertEquals("fake", returnedUnits.get(0).getSingular());
        assertEquals("fake", returnedUnits.get(0).getPlural());
    }

    @Test
    void handleRequest_shouldReturnUnit_whenNoRowDataReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getUnits()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("");

        List<Unit> returnedUnits = this.service.handleRequest(new Object(), this.context);

        assertEquals(1, returnedUnits.size());
        assertEquals("", returnedUnits.get(0).getId());
        assertEquals("", returnedUnits.get(0).getSingular());
        assertEquals("", returnedUnits.get(0).getPlural());
    }

    @Test
    void handleRequest_shouldReturnUnit_whenNullReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getUnits()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn(null);

        List<Unit> returnedUnits = this.service.handleRequest(new Object(), this.context);

        assertEquals(1, returnedUnits.size());
        assertNull(returnedUnits.get(0).getId());
        assertNull(returnedUnits.get(0).getSingular());
        assertNull(returnedUnits.get(0).getPlural());
    }

    @Test
    void handleRequest_shouldThrowException_whenCannotCommunicateWithDb() throws Exception {
        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getUnits()).thenThrow(BadRequestException.class);

        ServerException returnedException = assertThrows(ServerException.class,
                () -> this.service.handleRequest(new Object(), this.context));
        assertTrue(returnedException.getMessage().contains("issue communicating with database"));
    }

    @Test
    void handleRequest_shouldReturnUnit_whenNullInputObject() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getUnits()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        List<Unit> returnedUnits = this.service.handleRequest(null, this.context);

        assertEquals(1, returnedUnits.size());
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