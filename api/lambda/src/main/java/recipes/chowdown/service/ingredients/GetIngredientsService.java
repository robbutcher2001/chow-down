package recipes.chowdown.service.ingredients;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Ingredient;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.IngredientRepository;

public class GetIngredientsService implements RequestHandler<Object, List<Ingredient>> {

  private static LambdaLogger LOGGER;

  private IngredientRepository repository;

  public GetIngredientsService() {
    this.repository = new IngredientRepository();
  }

  public List<Ingredient> handleRequest(final Object input, final Context context) {
    try {
      LOGGER = context.getLogger();

      final List<Ingredient> ingredients = new ArrayList<>();

      ExecuteStatementResult result = this.repository.getIngredients();

      if (result.getRecords().size() < 1) {
        LOGGER.log("No ingredients found");
      }

      for (List<Field> fields : result.getRecords()) {
        ingredients.add(
            Ingredient.builder().id(fields.get(0).getStringValue()).name(fields.get(1).getStringValue()).build());
      }

      return ingredients;
    } catch (AmazonServiceException ase) {
      LOGGER.log(ase.getMessage());
      throw new ServerException("unable to complete request");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}