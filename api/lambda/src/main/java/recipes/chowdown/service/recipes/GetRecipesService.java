package recipes.chowdown.service.recipes;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.BadRequestException;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourcesNotFoundException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.RecipeRepository;

public class GetRecipesService implements RequestHandler<Object, List<Recipe>> {

  private static LambdaLogger LOGGER;

  private RecipeRepository repository;

  public GetRecipesService() {
    this.repository = new RecipeRepository();
  }

  public List<Recipe> handleRequest(final Object input, final Context context) {
    LOGGER = context.getLogger();

    final List<Recipe> recipes = new ArrayList<>();

    try {
      ExecuteStatementResult result = this.repository.getRecipes();

      if (result.getRecords().size() < 1) {
        LOGGER.log("No recipes found");
        throw new ResourcesNotFoundException("no recipes found");
      }

      for (List<Field> fields : result.getRecords()) {
        recipes.add(Recipe.builder().id(fields.get(0).getStringValue()).title(fields.get(1).getStringValue())
            .description(fields.get(2).getStringValue()).rating(fields.get(3).getLongValue())
            .url(fields.get(4).getStringValue()).image(fields.get(5).getStringValue()).build());
      }
    } catch (BadRequestException bre) {
      throw new ServerException("unable to complete request, issue communicating with database");
    }

    return recipes;
  }
}