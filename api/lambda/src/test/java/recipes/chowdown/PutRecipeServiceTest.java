package recipes.chowdown;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

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

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.repository.RecipeRepository;
import recipes.chowdown.service.recipes.PutRecipeService;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class PutRecipeServiceTest {

    @Mock
    private RecipeRepository repository;

    @Mock
    private Context context;

    @Mock
    private LambdaLogger logger;

    @InjectMocks
    private PutRecipeService service;

    @BeforeAll
    void beforeAll() {
        MockitoAnnotations.initMocks(this);

        this.service = new PutRecipeService();
    }

    @Test
    void handleRequest_shouldReturnPopulatedRecipe_whenNewRecipePut() throws Exception {
        ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
        Field mockField = Mockito.mock(Field.class);
        List<Field> columns = Collections.singletonList(mockField);
        List<List<Field>> rows = Collections.singletonList(columns);

        when(this.repository.putRecipe(Mockito.any(Recipe.class))).thenReturn(mockResult);
        when(mockResult.getRecords()).thenReturn(rows);
        when(mockField.getStringValue()).thenReturn("fake_id");
        when(this.context.getLogger()).thenReturn(this.logger);

        Recipe returnedRecipe = this.service.handleRequest(new Recipe(), this.context);

        assertEquals("fake_id", returnedRecipe.getId());
    }
}