package recipes.chowdown.service.ingredients;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import recipes.chowdown.ApiResponse;
import recipes.chowdown.domain.Ingredient;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.IngredientRepository;

public class PutIngredientService implements RequestHandler<Ingredient, ApiResponse<Ingredient>> {

  private static LambdaLogger logger;

  private IngredientRepository repository;

  public PutIngredientService() {
    this.repository = new IngredientRepository();
  }

  public ApiResponse<Ingredient> handleRequest(final Ingredient ingredient, final Context context)
      throws RuntimeException {
    try {
      logger = context.getLogger();

      ingredient.setId(null);
      ExecuteStatementResult result = this.repository.putIngredient(ingredient);

      if (result.getRecords().size() != 1) {
        throw new ResourceNotPersistedException("inconsistent number of rows returned after PUT");
      }

      final int rowIndex = 0;
      final int columnIndex = 0;
      final String returnedId = result.getRecords().get(rowIndex).get(columnIndex).getStringValue();

      if (returnedId.isEmpty()) {
        throw new ResourceNotPersistedException("no ID returned from database");
      }

      logger.log("New ingredient persisted with id [" + returnedId + "]");
      ingredient.setId(returnedId);

      return new ApiResponse<Ingredient>("ingredient", ingredient);
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}