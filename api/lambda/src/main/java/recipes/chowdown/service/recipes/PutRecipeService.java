package recipes.chowdown.service.recipes;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.RecipeRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

public class PutRecipeService implements RequestHandler<Recipe, Recipe> {

  private static LambdaLogger logger;

  private RecipeRepository repository;

  public PutRecipeService() {
    this.repository = new RecipeRepository();
  }

  public Recipe handleRequest(final Recipe recipe, final Context context) throws RuntimeException {
    try {
      logger = context.getLogger();

      recipe.setId(null);
      ExecuteStatementResult result = this.repository.putRecipe(recipe);

      if (result.getRecords().size() != 1) {
        throw new ResourceNotPersistedException("inconsistent number of rows returned after PUT");
      }

      final int rowIndex = 0;
      final int columnIndex = 0;
      final String returnedId = result.getRecords().get(rowIndex).get(columnIndex).getStringValue();

      if (returnedId.isEmpty()) {
        throw new ResourceNotPersistedException("no ID returned from database");
      }

      logger.log("New recipe persisted with id [" + returnedId + "]");
      recipe.setId(returnedId);

      String response = CacheInvalidator.invalidate(Endpoint.RECIPE);
      logger.log("Recipe cache purge status [" + response + "]");

      return recipe;
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}