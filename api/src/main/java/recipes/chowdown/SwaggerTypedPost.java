package recipes.chowdown;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import org.apache.http.HttpStatus;

import recipes.chowdown.domain.Recipe;

public class SwaggerTypedPost implements RequestHandler<Recipe, ApigResponse> {
  public ApigResponse handleRequest(final Recipe recipe, final Context context) {
    System.out.println(recipe.getId());
    System.out.println(recipe.getTitle());

    return new ApigResponse(HttpStatus.SC_OK, recipe.toString());
  }
}