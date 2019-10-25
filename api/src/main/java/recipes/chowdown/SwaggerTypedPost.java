package recipes.chowdown;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.repository.RecipeRepository;

public class SwaggerTypedPost implements RequestHandler<Recipe, Recipe> {

  private static LambdaLogger logger;

  private RecipeRepository repository;

  public SwaggerTypedPost() {
    this.repository = new RecipeRepository();
  }

  public Recipe handleRequest(final Recipe recipe, final Context context) throws RuntimeException {
    logger = context.getLogger();

    ExecuteStatementResult result = this.repository.putRecipe(recipe);

    if (result.getRecords().size() != 1) {
      throw new ResourceNotPersistedException("inconsistent number of rows returned after PUT");
    }

    final String returnedId = result.getRecords().get(0).get(0).getStringValue();

    if (returnedId.isEmpty()) {
      throw new ResourceNotPersistedException("no ID returned from database");
    }

    logger.log("New recipe persisted with id [" + returnedId + "]");
    // recipe.setId(returnedId);

    return recipe;
  }
}