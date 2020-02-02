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

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class RecipeRepositoryTest {

    @Mock
    private AWSRDSData rdsData;

    @InjectMocks
    private RecipeRepository repository;

    @BeforeAll
    void beforeAll() {
        MockitoAnnotations.initMocks(this);

        this.repository = new RecipeRepository();
    }

    @Test
    void getRecipes_shouldReturnResults_whenRequestValid() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

        ExecuteStatementResult result = this.repository.getRecipes();

        assertEquals(mockResult, result);
    }

    @Test
    void getRecipes_shouldNotReturnResults_whenRequestInvalid() throws Exception {
        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(null);

        ExecuteStatementResult result = this.repository.getRecipes();

        assertNull(result);
    }

    @Test
    void putRecipe_shouldReturnResults_whenRequestValidRecipe() throws Exception {
        Recipe recipe = Recipe.builder().title("katsu curry").description("good food").rating(5l).url("url")
                .image("src").build();
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

        ExecuteStatementResult result = this.repository.putRecipe(recipe);

        assertEquals(mockResult, result);
    }

    @Test
    void putRecipe_shouldReturnResults_whenRequestInvalidRecipe() throws Exception {
        Recipe recipe = Recipe.builder().build();
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

        ExecuteStatementResult result = this.repository.putRecipe(recipe);

        assertEquals(mockResult, result);
    }

    @Test
    void putRecipe_shouldThrowException_whenRequestNullRecipe() throws Exception {
        ResourceNotPersistedException returnedException = assertThrows(ResourceNotPersistedException.class,
                () -> this.repository.putRecipe(null));
        assertTrue(returnedException.getMessage().contains("part or all of the input Recipe was null"));
    }
}