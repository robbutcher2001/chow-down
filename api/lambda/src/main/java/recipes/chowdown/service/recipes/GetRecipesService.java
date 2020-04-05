package recipes.chowdown.service.recipes;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.RecipeRepository;

public class GetRecipesService implements RequestHandler<Object, List<Recipe>> {

  private static LambdaLogger LOGGER;

  private RecipeRepository repository;

  public GetRecipesService() {
    this.repository = new RecipeRepository();
  }

  public List<Recipe> handleRequest(final Object input, final Context context) {
    try {
      LOGGER = context.getLogger();

      final List<Recipe> recipes = new ArrayList<>();

      ExecuteStatementResult result = this.repository.getRecipes();

      if (result.getRecords().size() < 1) {
        LOGGER.log("No recipes found");
      }

      for (List<Field> fields : result.getRecords()) {
        recipes.add(Recipe.builder().id(fields.get(0).getStringValue()).title(fields.get(1).getStringValue())
            .description(fields.get(2).getStringValue()).rating(fields.get(3).getLongValue())
            .url(fields.get(4).getStringValue()).image(fields.get(5).getStringValue())
            .createdDate(fields.get(6).getStringValue()).build());
      }

      return recipes;
    } catch (AmazonServiceException ase) {
      LOGGER.log(ase.getMessage());
      throw new ServerException("unable to complete request");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}