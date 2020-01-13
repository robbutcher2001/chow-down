package recipes.chowdown.service.ingredients;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.BadRequestException;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import recipes.chowdown.domain.Ingredient;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.IngredientRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

public class PutIngredientService implements RequestHandler<Ingredient, Ingredient> {

  private static LambdaLogger logger;

  private IngredientRepository repository;

  public PutIngredientService() {
    this.repository = new IngredientRepository();
  }

  public Ingredient handleRequest(final Ingredient ingredient, final Context context) throws RuntimeException {
    try {
      logger = context.getLogger();

      ingredient.setId(null);
      ExecuteStatementResult result = this.repository.putIngredient(ingredient);

      // TODO; ResourceNotPersistedException is not caught in Swagger so has no
      // response code mapping in APIG
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

      String response = CacheInvalidator.invalidate(Endpoint.INGREDIENT);
      logger.log("Ingredient cache purge status [" + response + "]");

      return ingredient;
    } catch (BadRequestException bre) {
      throw new ServerException("unable to complete request, issue communicating with database");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}