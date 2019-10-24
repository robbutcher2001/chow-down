package recipes.chowdown;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourcesNotFoundException;

public class SwaggerTypedPost implements RequestHandler<Recipe, Recipe> {

  private static LambdaLogger Logger;
  
  public Recipe handleRequest(final Recipe recipe, final Context context) throws RuntimeException {
    Logger = context.getLogger();

    Logger.log("The recipe object:");
    Logger.log(recipe.getId());
    Logger.log(recipe.getTitle());

    if (recipe.getId().equals("exception")) {
      Logger.log("Throwing a new exception");
      throw new ResourcesNotFoundException("can't find it");
    }

    return recipe;
  }
}