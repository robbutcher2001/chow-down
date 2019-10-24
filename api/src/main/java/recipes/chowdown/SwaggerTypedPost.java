package recipes.chowdown;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourcesNotFoundException;

public class SwaggerTypedPost implements RequestHandler<Recipe, List<Recipe>> {

  private static LambdaLogger Logger;
  
  public List<Recipe> handleRequest(final Recipe recipe, final Context context) throws RuntimeException {
    List<Recipe> recipes = new ArrayList<>();
    Logger = context.getLogger();

    Logger.log("The recipe object:");
    Logger.log(recipe.getId());
    Logger.log(recipe.getTitle());

    if (recipe.getId().equals("exception")) {
      Logger.log("Throwing a new exception");
      throw new ResourcesNotFoundException("can't find it");
    }

    recipes.add(recipe);

    Recipe newRecipe = new Recipe();
    newRecipe.setId("fake id");
    newRecipe.setTitle("fake title");

    recipes.add(newRecipe);

    return recipes;
  }
}