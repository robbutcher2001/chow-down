package recipes.chowdown;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import org.apache.http.HttpStatus;

import recipes.chowdown.domain.Recipe;

public class SwaggerTypedPost implements RequestHandler<Recipe, Recipe> {

  private static LambdaLogger Logger;
  
  public Recipe handleRequest(final Recipe recipe, final Context context) {
    Logger = context.getLogger();

    Logger.log("The recipe object:");
    Logger.log(recipe.getId());
    Logger.log(recipe.getTitle());

    return recipe;

    // return new ApigResponse(HttpStatus.SC_OK, recipe.toString());
  }
}