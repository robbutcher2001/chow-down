package recipes.chowdown.service.recipes;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import eu.maxschuster.dataurl.DataUrl;
import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.RecipeRepository;
import recipes.chowdown.repository.S3Repository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;
import recipes.chowdown.service.images.DataUrlService;

public class PutRecipeService implements RequestHandler<Recipe, Recipe> {

  private static LambdaLogger LOGGER;

  private RecipeRepository recipeRepository;

  private S3Repository s3Repository;

  private CacheInvalidator cacheInvalidator;

  private DataUrlService dataUrlService;

  public PutRecipeService() {
    this.recipeRepository = new RecipeRepository();
    this.s3Repository = new S3Repository();
    this.cacheInvalidator = new CacheInvalidator();
    this.dataUrlService = new DataUrlService();
  }

  public Recipe handleRequest(final Recipe recipe, final Context context) throws RuntimeException {
    try {
      LOGGER = context.getLogger();

      recipe.setId(null);
      final String recipeImage = recipe.getImage();

      // test S3 upload
      if (recipeImage != null) {
        final DataUrl imageDataUrl = this.dataUrlService.decodeDataUrl(recipeImage);
        final String imageUuid = this.s3Repository.putRecipeImage(imageDataUrl.getData(), imageDataUrl.getMimeType());
        recipe.setImage(imageUuid);
      }
      // end test S3 upload

      ExecuteStatementResult result = this.recipeRepository.putRecipe(recipe);

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