package recipes.chowdown.service.ingredients;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
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

import recipes.chowdown.domain.Ingredient;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.IngredientRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class PutIngredientServiceTest {

    @Mock
    private Context context;

    @Mock
    private LambdaLogger logger;

    @Mock
    private IngredientRepository repository;

    @Mock
    private CacheInvalidator cacheInvalidator;

    @InjectMocks
    private PutIngredientService service;

    @BeforeAll
    void beforeAll() {
        MockitoAnnotations.initMocks(this);

        this.service = new PutIngredientService();
    }

    @Test
    void handleRequest_shouldReturnPopulatedIngredient_whenNewIngredientPut() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putIngredient(Mockito.any(Ingredient.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake_id");
        when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

        Ingredient returnedIngredient = this.service.handleRequest(new Ingredient(), this.context);

        assertEquals("fake_id", returnedIngredient.getId());
    }

    @Test
    void handleRequest_shouldThrowException_whenMultipleIngredientPut() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = new ArrayList<>();

        // Fake two rows returned
        rows.add(columns);
        rows.add(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putIngredient(Mockito.any(Ingredient.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Ingredient(), this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenNoIngredientPut() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putIngredient(Mockito.any(Ingredient.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(Collections.emptyList());

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Ingredient(), this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenNoIdReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putIngredient(Mockito.any(Ingredient.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("");

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Ingredient(), this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenNullReturnedFromDb() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putIngredient(Mockito.any(Ingredient.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn(null);

        assertThrows(ServerException.class, () -> this.service.handleRequest(new Ingredient(), this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenCannotCommunicateWithDb() throws Exception {
        when(this.context.getLogger()).thenReturn(this.logger);
        when(this.repository.putIngredient(Mockito.any(Ingredient.class))).thenThrow(BadRequestException.class);

        ServerException returnedException = assertThrows(ServerException.class,
                () -> this.service.handleRequest(new Ingredient(), this.context));
        assertTrue(returnedException.getMessage().contains("issue communicating with database"));
    }

    @Test
    void handleRequest_shouldThrowException_whenNullIngredientPut() throws Exception {
        when(this.context.getLogger()).thenReturn(this.logger);

        assertThrows(ServerException.class, () -> this.service.handleRequest(null, this.context));
    }

    @Test
    void handleRequest_shouldThrowException_whenNullContext() throws Exception {
        assertThrows(ServerException.class, () -> this.service.handleRequest(new Ingredient(), null));
    }

    @Test
    void handleRequest_shouldThrowException_whenAllNullInput() throws Exception {
        assertThrows(ServerException.class, () -> this.service.handleRequest(null, null));
    }
}