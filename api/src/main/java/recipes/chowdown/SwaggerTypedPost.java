package recipes.chowdown;

import java.io.IOException;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.HttpStatus;

import recipes.chowdown.domain.Recipe;

public class SwaggerTypedPost implements RequestHandler<String, ApigResponse> {
  public ApigResponse handleRequest(final String object, final Context context) {
    // context.getLogger().
    System.out.println("The recipe object:");
    System.out.println(object);

    // ObjectMapper o = new ObjectMapper();
    // JsonNode jsonNode = null;
    // try {
    //   jsonNode = o.readTree(object);
    // } catch (IOException e) {
    //   // TODO Auto-generated catch block
    //   e.printStackTrace();
    // }

    // Recipe recipe = (Recipe) object;

    // System.out.println("The recipe object:");
    // System.out.println(jsonNode.toString());
    // System.out.println("The recipe getters:");
    // System.out.println(recipe.getId());
    // System.out.println(recipe.getTitle());

    return new ApigResponse(HttpStatus.SC_OK, "nothing");
  }
}