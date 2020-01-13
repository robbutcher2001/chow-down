package recipes.chowdown.service.ingredients;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.BadRequestException;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Ingredient;
import recipes.chowdown.exceptions.ResourcesNotFoundException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.IngredientRepository;

public class GetIngredientsService implements RequestHandler<Object, List<Ingredient>> {
  private static LambdaLogger logger;

  private IngredientRepository repository;

  public GetIngredientsService() {
    this.repository = new IngredientRepository();
  }

  public List<Ingredient> handleRequest(final Object input, final Context context) {
    logger = context.getLogger();

    final List<Ingredient> ingredients = new ArrayList<>();

    try {
      ExecuteStatementResult result = this.repository.getIngredients();

      if (result.getRecords().size() < 1) {
        logger.log("No ingredients found");
        throw new ResourcesNotFoundException("no ingredients found");
      }

      for (List<Field> fields : result.getRecords()) {
        ingredients.add(
            Ingredient.builder().id(fields.get(0).getStringValue()).ingredient(fields.get(1).getStringValue()).build());
      }
    } catch (BadRequestException bre) {
      throw new ServerException("unable to complete request, issue communicating with database");
    }

    return ingredients;
  }
}