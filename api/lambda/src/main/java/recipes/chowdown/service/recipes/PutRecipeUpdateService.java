package recipes.chowdown.service.recipes;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import eu.maxschuster.dataurl.DataUrl;
import recipes.chowdown.domain.Recipe;
import recipes.chowdown.domain.Tag;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.RecipeRepository;
import recipes.chowdown.repository.S3Repository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;
import recipes.chowdown.service.images.DataUrlService;

public class PutRecipeUpdateService implements RequestHandler<Recipe, Recipe> {

  private static LambdaLogger LOGGER;

  private RecipeRepository recipeRepository;

  private S3Repository s3Repository;

  private CacheInvalidator cacheInvalidator;

  private DataUrlService dataUrlService;

  private GetRecipesService getRecipesService;

  public PutRecipeUpdateService() {
    this.recipeRepository = new RecipeRepository();
    this.s3Repository = new S3Repository();
    this.cacheInvalidator = new CacheInvalidator();
    this.dataUrlService = new DataUrlService();
    this.getRecipesService = new GetRecipesService();
  }

  public Recipe handleRequest(final Recipe newRecipeData, final Context context) throws RuntimeException {
    try {
      LOGGER = context.getLogger();

      // recipe.setId(null);
      // OffsetDateTime now = OffsetDateTime.now(ZoneOffset.UTC);
      // recipe.setCreatedDate(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(now));

      // final String recipeImage = recipe.getImage();
      // if (recipeImage != null) {
      //   final DataUrl imageDataUrl = this.dataUrlService.decodeDataUrl(recipeImage);
      //   final String imageUuid = this.s3Repository.putRecipeImage(imageDataUrl.getData(), imageDataUrl.getMimeType());
      //   LOGGER.log("Recipe image persisted with id [" + imageUuid + "]");
      //   recipe.setImage(imageUuid);
      // }

      // TODO: need getRecipeById service
      final List<Recipe> existingRecipes = this.getRecipesService.getRecipes(context);
      final Recipe updatedRecipe = existingRecipes.stream()
          .filter(existingRecipe -> existingRecipe.getId().equals(newRecipeData.getId())).findAny().orElse(null);

      if (updatedRecipe != null) {
        final List<Tag> existingTags = updatedRecipe.getTags();
        if (existingTags == null) {
          LOGGER.log("existingTags null for " + newRecipeData.getTitle());
        }
        else {
          List<String> existingTagIds = existingTags.stream().map(existingTag -> existingTag.getId()).collect(Collectors.toList());
          List<String> newTagIds = newRecipeData.getTags().stream().map(newTag -> newTag.getId()).collect(Collectors.toList());

          final List<String> toDelete = existingTagIds.stream().filter(existingTagId -> !newTagIds.contains(existingTagId)).collect(Collectors.toList());
          final List<String> toAdd = newTagIds.stream().filter(newTagId -> !existingTagIds.contains(newTagId)).collect(Collectors.toList());
          System.out.println("deleting");
          System.out.println(toDelete);
          System.out.println("adding");
          System.out.println(toAdd);
        }
        updatedRecipe.setTags(newRecipeData.getTags());
      }

      // if (result.getRecords().size() != 1) {
      //   throw new ResourceNotPersistedException("inconsistent number of rows returned after PUT");
      // }

      // final int rowIndex = 0;
      // final int columnIndex = 0;
      // final String returnedId = result.getRecords().get(rowIndex).get(columnIndex).getStringValue();

      // if (returnedId.isEmpty()) {
      //   throw new ResourceNotPersistedException("no ID returned from database");
      // }

      // LOGGER.log("New recipe persisted with id [" + returnedId + "]");
      // recipe.setId(returnedId);

      // String response = this.cacheInvalidator.invalidate(Endpoint.RECIPE);
      // LOGGER.log("Recipe cache purge status [" + response + "]");

      return updatedRecipe;
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