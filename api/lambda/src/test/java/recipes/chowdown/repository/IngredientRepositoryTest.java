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

import recipes.chowdown.domain.Ingredient;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class IngredientRepositoryTest {

    @Mock
    private AWSRDSData rdsData;

    @InjectMocks
    private IngredientRepository repository;

    @BeforeAll
    void beforeAll() {
        MockitoAnnotations.initMocks(this);

        this.repository = new IngredientRepository();
    }

    @Test
    void getIngredients_shouldReturnResults_whenRequestValid() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

        ExecuteStatementResult result = this.repository.getIngredients();

        assertEquals(mockResult, result);
    }

    @Test
    void getIngredients_shouldNotReturnResults_whenRequestInvalid() throws Exception {
        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(null);

        ExecuteStatementResult result = this.repository.getIngredients();

        assertNull(result);
    }

    @Test
    void putIngredient_shouldReturnResults_whenRequestValidIngredient() throws Exception {
        Ingredient ingredient = Ingredient.builder().name("tomato").build();
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

        ExecuteStatementResult result = this.repository.putIngredient(ingredient);

        assertEquals(mockResult, result);
    }

    @Test
    void putIngredient_shouldReturnResults_whenRequestInvalidIngredient() throws Exception {
        Ingredient ingredient = Ingredient.builder().build();

        ResourceNotPersistedException returnedException = assertThrows(ResourceNotPersistedException.class,
                () -> this.repository.putIngredient(ingredient));
        
        assertTrue(returnedException.getMessage().contains("part or all of the input Ingredient was null"));
    }

    @Test
    void putIngredient_shouldThrowException_whenRequestNullIngredient() throws Exception {
        ResourceNotPersistedException returnedException = assertThrows(ResourceNotPersistedException.class,
                () -> this.repository.putIngredient(null));
        assertTrue(returnedException.getMessage().contains("part or all of the input Ingredient was null"));
    }
}