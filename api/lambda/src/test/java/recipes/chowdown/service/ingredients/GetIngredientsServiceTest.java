package recipes.chowdown.service.ingredients;

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

import recipes.chowdown.domain.Ingredient;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.IngredientRepository;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class GetIngredientsServiceTest {

    @Mock
    private Context context;

    @Mock
    private LambdaLogger logger;

    @Mock
    private IngredientRepository repository;

    @InjectMocks
    private GetIngredientsService service;

    @BeforeAll
    void beforeAll() {
        MockitoAnnotations.initMocks(this);

        this.service = new GetIngredientsService();
    }

    @Test
    void handleRequest_shouldReturnIngredient_whenExistsSingle() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        List<Ingredient> returnedIngredients = this.service.handleRequest(new Object(), this.context);

        assertEquals(1, returnedIngredients.size());
    }

    @Test
    void handleRequest_shouldReturnIngredients_whenExistsMultiple() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField);
        List<List<Field>> rows = Arrays.asList(columns, columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        List<Ingredient> returnedIngredients = this.service.handleRequest(new Object(), this.context);

        assertEquals(2, returnedIngredients.size());
    }

    @Test
    void handleRequest_shouldNotReturnIngredients_whenNoIngredientsExist() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(Collections.emptyList());

        List<Ingredient> returnedIngredients = this.service.handleRequest(new Object(), this.context);

        assertEquals(0, returnedIngredients.size());
    }

    @Test
    void handleRequest_shouldThrowException_whenTooFewRowsReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);

        // only return one column (id) and not ingredient name
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Object(), this.context));
    }

    @Test
    void handleRequest_shouldReturnIngredient_whenTooManyRowsReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);

        // return three columns (too many for query)
        List<Field> columns = Arrays.asList(mockField, mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        List<Ingredient> returnedIngredients = this.service.handleRequest(new Object(), this.context);

        assertEquals(1, returnedIngredients.size());
        assertEquals("fake", returnedIngredients.get(0).getId());
        assertEquals("fake", returnedIngredients.get(0).getName());
    }

    @Test
    void handleRequest_shouldReturnIngredient_whenNoRowDataReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("");

        List<Ingredient> returnedIngredients = this.service.handleRequest(new Object(), this.context);

        assertEquals(1, returnedIngredients.size());
        assertEquals("", returnedIngredients.get(0).getId());
        assertEquals("", returnedIngredients.get(0).getName());
    }

    @Test
    void handleRequest_shouldReturnIngredient_whenNullReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn(null);

        List<Ingredient> returnedIngredients = this.service.handleRequest(new Object(), this.context);

        assertEquals(1, returnedIngredients.size());
        assertNull(returnedIngredients.get(0).getId());
        assertNull(returnedIngredients.get(0).getName());
    }

    @Test
    void handleRequest_shouldThrowException_whenCannotCommunicateWithDb() throws Exception {
        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenThrow(BadRequestException.class);

        ServerException returnedException = assertThrows(ServerException.class,
                () -> this.service.handleRequest(new Object(), this.context));
        assertTrue(returnedException.getMessage().contains("unable to complete request"));
    }

    @Test
    void handleRequest_shouldThrowException_whenCannotAuthenticateWithDb() throws Exception {
        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenThrow(new AWSRDSDataException(
                "arn:aws:ACCOUNT_NUMBER/role is not authorized to perform: <action> on resource: arn:aws:ACCOUNT_NUMBER/resource"));

        ServerException returnedException = assertThrows(ServerException.class,
                () -> this.service.handleRequest(new Object(), this.context));
        assertTrue(returnedException.getMessage().contains("unable to complete request"));
        assertFalse(returnedException.getMessage().contains("ACCOUNT_NUMBER"));
        assertFalse(returnedException.getMessage().contains("is not authorized to perform"));
    }

    @Test
    void handleRequest_shouldReturnIngredient_whenNullInputObject() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Arrays.asList(mockField, mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.getIngredients()).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake");

        List<Ingredient> returnedIngredients = this.service.handleRequest(null, this.context);

        assertEquals(1, returnedIngredients.size());
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