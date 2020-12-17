package recipes.chowdown.service.recipes;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.domain.Tag;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.RecipeRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

public class PutRecipeUpdateService implements RequestHandler<Recipe, Recipe> {

  private static LambdaLogger LOGGER;

  private GetRecipesService getRecipesService;

  private RecipeRepository recipeRepository;

  private CacheInvalidator cacheInvalidator;

  public PutRecipeUpdateService() {
    this.getRecipesService = new GetRecipesService();
    this.recipeRepository = new RecipeRepository();
    this.cacheInvalidator = new CacheInvalidator();
  }

  public Recipe handleRequest(final Recipe newRecipeData, final Context context) throws RuntimeException {
    try {
      LOGGER = context.getLogger();

      if (newRecipeData == null || newRecipeData.getId() == null || newRecipeData.getId().isEmpty() || newRecipeData.getTags() == null) {
        throw new IllegalArgumentException("recipeId or tags cannot be null or empty");
      }

      newRecipeData.getTags().stream().forEach(tag -> {
        if (tag == null || tag.getId() == null || tag.getId().isEmpty()) {
          throw new IllegalArgumentException("new recipe tagId cannot be null or empty");
        }
      });

      // TODO: need getRecipeById service
      final List<Recipe> existingRecipes = this.getRecipesService.getRecipes(context);
      final Recipe updatedRecipe = existingRecipes.stream()
          .filter(existingRecipe -> existingRecipe.getId().equals(newRecipeData.getId())).findAny().orElse(null);

      if (updatedRecipe == null || updatedRecipe.getId() == null || updatedRecipe.getId().isEmpty() || updatedRecipe.getTags() == null) {
        throw new IllegalArgumentException("existing recipe not found with matching ID or populated tags");
      }

      updatedRecipe.getTags().stream().forEach(tag -> {
        if (tag == null || tag.getId() == null || tag.getId().isEmpty()) {
          throw new IllegalArgumentException("existing recipe tagId cannot be null or empty");
        }
      });

      final List<Tag> existingTags = updatedRecipe.getTags();
      final List<String> existingTagIds = existingTags != null ?
        existingTags.stream().map(existingTag -> existingTag.getId()).collect(Collectors.toList()) :
        Collections.emptyList();
      final List<String> newTagIds = newRecipeData.getTags().stream().map(newTag -> newTag.getId()).collect(Collectors.toList());

      final List<String> toDeleteIds = existingTagIds.stream().filter(existingTagId -> !newTagIds.contains(existingTagId)).collect(Collectors.toList());
      final List<String> toAddIds = newTagIds.stream().filter(newTagId -> !existingTagIds.contains(newTagId)).collect(Collectors.toList());

      this.recipeRepository.putRecipeTags(newRecipeData.getId(), toDeleteIds, toAddIds);

      LOGGER.log("New recipe tags persisted with id [" + toAddIds + "]");
      newRecipeData.getTags().sort((Tag tag1, Tag tag2) -> tag1.getName() == null || tag2.getName() == null ? 0
          : tag1.getName().compareTo(tag2.getName()));
      updatedRecipe.setTags(newRecipeData.getTags());

      String response = this.cacheInvalidator.invalidate(Endpoint.RECIPE);
      LOGGER.log("Recipe cache purge status [" + response + "]");

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