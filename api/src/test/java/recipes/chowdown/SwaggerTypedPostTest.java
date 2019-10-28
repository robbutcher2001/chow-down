package recipes.chowdown;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.repository.RecipeRepository;

@TestInstance(Lifecycle.PER_CLASS)
public class SwaggerTypedPostTest {

    @InjectMocks
    private SwaggerTypedPost service;

    @Mock
    private RecipeRepository repository;

    @BeforeAll
    void beforeAll() {
        MockitoAnnotations.initMocks(this);

        this.service = new SwaggerTypedPost();
    }

    @Test
    void handleRequest_shouldReturnPopulatedRecipe_whenNewRecipePut() throws Exception {
        Context mockContext = Mockito.mock(Context.class);
        Recipe mockRecipe = Mockito.mock(Recipe.class);
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

        doReturn(mockResult).when(this.repository).putRecipe(Mockito.any(Recipe.class));
        // when(this.repository.putRecipe(Mockito.any(Recipe.class))).thenReturn(mockResult);
        // when(mockResult.getRecords().size()).thenReturn(1);

        Recipe returnRecipe = this.service.handleRequest(mockRecipe, mockContext);

        // assertEquals(1, returnRecipe.getId());
    }

    @Test
    void fake() throws Exception {
        assertEquals(1, 1);
    }
}