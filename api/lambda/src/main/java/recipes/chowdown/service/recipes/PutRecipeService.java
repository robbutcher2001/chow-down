package recipes.chowdown.service.recipes;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.RecipeRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;
import recipes.chowdown.service.images.DataUrlService;

public class PutRecipeService implements RequestHandler<Recipe, Recipe> {

  private static LambdaLogger LOGGER;

  private RecipeRepository repository;

  private CacheInvalidator cacheInvalidator;

  private DataUrlService dataUrlService;

  public PutRecipeService() {
    this.repository = new RecipeRepository();
    this.cacheInvalidator = new CacheInvalidator();
    this.dataUrlService = new DataUrlService();
  }

  public Recipe handleRequest(final Recipe recipe, final Context context) throws RuntimeException {
    try {
      LOGGER = context.getLogger();

      recipe.setId(null);
      ExecuteStatementResult result = this.repository.putRecipe(recipe);

      if (result.getRecords().size() != 1) {
        throw new ResourceNotPersistedException("inconsistent number of rows returned after PUT");
      }

      final int rowIndex = 0;
      final int columnIndex = 0;
      final String returnedId = result.getRecords().get(rowIndex).get(columnIndex).getStringValue();

      if (returnedId.isEmpty()) {
        throw new ResourceNotPersistedException("no ID returned from database");
      }

      LOGGER.log("New recipe persisted with id [" + returnedId + "]");
      recipe.setId(returnedId);

      String response = this.cacheInvalidator.invalidate(Endpoint.RECIPE);
      LOGGER.log("Recipe cache purge status [" + response + "]");

      // test S3 upload
      this.dataUrlService.decodeDataUrl(recipe.getImage());
      // end test S3 upload

      return recipe;
      // TODO: maybe BadRequestException / AmazonServiceException needs to move down
      // to the repository
    } catch (AmazonServiceException ase) {
      LOGGER.log(ase.getMessage());
      throw new ServerException("unable to complete request");
      // TODO: maybe this needs to not catch ResourceNotPersistedException and instead
      // handle it separately
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}