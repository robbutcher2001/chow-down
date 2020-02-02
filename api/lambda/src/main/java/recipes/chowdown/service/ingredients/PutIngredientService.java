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

  private static LambdaLogger LOGGER;

  private IngredientRepository repository;

  private CacheInvalidator cacheInvalidator;

  public PutIngredientService() {
    this.repository = new IngredientRepository();
    this.cacheInvalidator = new CacheInvalidator();
  }

  public Ingredient handleRequest(final Ingredient ingredient, final Context context) throws RuntimeException {
    try {
      LOGGER = context.getLogger();

      ingredient.setId(null);
      ExecuteStatementResult result = this.repository.putIngredient(ingredient);

      // TODO; ResourceNotPersistedException is not caught in Swagger so has no
      // response code mapping in APIG - do this and change tests to asset for ResourceNotPersistedException instead of ServerException
      if (result.getRecords().size() != 1) {
        throw new ResourceNotPersistedException("inconsistent number of rows returned after PUT");
      }

      final int rowIndex = 0;
      final int columnIndex = 0;
      final String returnedId = result.getRecords().get(rowIndex).get(columnIndex).getStringValue();

      if (returnedId.isEmpty()) {
        throw new ResourceNotPersistedException("no ID returned from database");
      }

      LOGGER.log("New ingredient persisted with id [" + returnedId + "]");
      ingredient.setId(returnedId);

      String response = this.cacheInvalidator.invalidate(Endpoint.INGREDIENT);
      LOGGER.log("Ingredient cache purge status [" + response + "]");

      return ingredient;
    } catch (BadRequestException bre) {
      throw new ServerException("unable to complete request, issue communicating with database");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}