package recipes.chowdown.repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.BatchExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.BatchExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.BeginTransactionRequest;
import com.amazonaws.services.rdsdata.model.BeginTransactionResult;
import com.amazonaws.services.rdsdata.model.CommitTransactionRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;
import com.amazonaws.services.rdsdata.model.SqlParameter;
import com.amazonaws.services.rdsdata.model.TypeHint;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.domain.RecipeIngredient;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

public class RecipeRepository {
  private static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
  private static final String SECRET_ARN = System.getenv("SECRET_ARN");
  private static final String DATABASE = System.getenv("DATABASE_NAME");

  private static final String GET_RECIPE_SQL = "SELECT r.id, r.title, r.description, r.rating, r.url, r.image, r.created_date FROM chow.recipes r ORDER BY r.title";
  private static final String GET_RECIPE_TAGS_SQL = "SELECT rt.recipe_id, t.id, t.name, t.background_colour, t.text_colour "
      + "FROM chow.recipe_tags rt "
      + "INNER JOIN chow.tags t "
      + "  ON t.id = rt.tag_id";
  private static final String POST_RECIPE_BODY_SQL = "INSERT INTO chow.recipes (id, title, description, rating, url, image, created_date) "
      + "VALUES (DEFAULT, :title, :description, :rating, :url, :image, :createdDate) RETURNING id";
  private static final String POST_RECIPE_INGREDIENTS_SQL = "INSERT INTO chow.recipe_ingredients (id, quantity, unit_id, ingredient_id, recipe_id) "
      + "VALUES (DEFAULT, :quantity, :unitId::uuid, :ingredientId::uuid, :recipeId::uuid) RETURNING id";
  private static final String PUT_RECIPE_TAG_SQL = "INSERT INTO chow.recipe_tags (id, tag_id, recipe_id) "
      + "VALUES (DEFAULT, :tagId::uuid, :recipeId::uuid)";
  private static final String DELETE_RECIPE_TAG_SQL = "DELETE FROM chow.recipe_tags rt "
      + "WHERE rt.tag_id = :tagId::uuid AND rt.recipe_id = :recipeId::uuid";

  private AWSRDSData rdsData;

  public RecipeRepository() {
    this.rdsData = AWSRDSDataClient.builder().build();
  }

  public ExecuteStatementResult getRecipes() {
    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_RECIPE_SQL));
  }

  public ExecuteStatementResult getRecipeTags() {
    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_RECIPE_TAGS_SQL));
  }

  public ExecuteStatementResult postRecipe(final Recipe recipe) {
    final String transactionId = beginTransaction();

    final ExecuteStatementResult executeStatementResult = postRecipeBody(recipe, transactionId);

    final int rowIndex = 0;
    final int columnIndex = 0;
    final String returnedId = executeStatementResult.getRecords().get(rowIndex).get(columnIndex).getStringValue();

    if (returnedId.isEmpty()) {
      throw new ResourceNotPersistedException("no ID returned from database");
    }

    recipe.setId(returnedId);
    postRecipeIngredients(recipe, transactionId);

    commitTransaction(transactionId);

    // TODO: should just return ID here as we've already extracted it but is pattern
    // change for all repositories. Maybe all repositories process the
    // `ExecuteStatementResult` and return object T to service (int, db count, id or
    // whatever)
    return executeStatementResult;
  }

  public void putRecipeTags(final String recipeId, final List<String> toDeleteIds, final List<String> toAddIds) {
    final String transactionId = beginTransaction();

    if (transactionId == null || transactionId.isEmpty()) {
      throw new IllegalArgumentException("transactionId cannot be null or empty");
    }

    if (recipeId == null || recipeId.equals("")) {
      throw new IllegalArgumentException("recipeId cannot be null or empty");
    }

    executeRecipeTagsSql(recipeId, toDeleteIds, DELETE_RECIPE_TAG_SQL, transactionId);
    executeRecipeTagsSql(recipeId, toAddIds, PUT_RECIPE_TAG_SQL, transactionId);

    commitTransaction(transactionId);
  }

  private ExecuteStatementResult postRecipeBody(final Recipe recipe, final String transactionId) {
    if (transactionId == null || transactionId.isEmpty()) {
      throw new IllegalArgumentException("transactionId cannot be null or empty");
    }

    if (recipe == null || recipe.getTitle() == null) {
      throw new IllegalArgumentException("recipe or recipe title cannot be null or empty");
    }

    Collection<SqlParameter> parameters = new ArrayList<>();

    try {
      parameters.add(new SqlParameter().withName("title").withValue(new Field().withStringValue(recipe.getTitle().trim())));
      parameters.add(
          new SqlParameter().withName("description").withValue(new Field().withStringValue(recipe.getDescription().trim())));
      parameters.add(new SqlParameter().withName("rating").withValue(new Field().withLongValue(recipe.getRating())));
      parameters.add(new SqlParameter().withName("url").withValue(new Field().withStringValue(recipe.getUrl().trim())));
      parameters.add(new SqlParameter().withName("image").withValue(new Field().withStringValue(recipe.getImage())));
      parameters.add(new SqlParameter().withName("createdDate")
          .withValue(new Field().withStringValue(recipe.getCreatedDate())).withTypeHint(TypeHint.TIMESTAMP));
    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input Recipe was null");
    }

    final ExecuteStatementRequest executeStatementRequest = new ExecuteStatementRequest()
        .withTransactionId(transactionId).withResourceArn(RESOURCE_ARN).withSecretArn(SECRET_ARN).withDatabase(DATABASE)
        .withSql(POST_RECIPE_BODY_SQL).withParameters(parameters);

    return this.rdsData.executeStatement(executeStatementRequest);
  }

  private BatchExecuteStatementResult postRecipeIngredients(final Recipe recipe, final String transactionId) {
    if (transactionId == null || transactionId.isEmpty()) {
      throw new IllegalArgumentException("transactionId cannot be null or empty");
    }

    Collection<List<SqlParameter>> recipeIngredientParameters = new ArrayList<>();

    try {
      List<RecipeIngredient> recipeIngredients = recipe.getIngredients();
      for (RecipeIngredient recipeIngredient : recipeIngredients) {
        List<SqlParameter> parameters = new ArrayList<>();
        parameters.add(new SqlParameter().withName("quantity")
            .withValue(new Field().withDoubleValue(recipeIngredient.getQuantity())));
        parameters.add(
            new SqlParameter().withName("unitId").withValue(new Field().withStringValue(recipeIngredient.getUnit().getId())));
        parameters.add(new SqlParameter().withName("ingredientId")
            .withValue(new Field().withStringValue(recipeIngredient.getIngredient().getId())));
        parameters.add(new SqlParameter().withName("recipeId").withValue(new Field().withStringValue(recipe.getId())));

        recipeIngredientParameters.add(parameters);
      }
    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input Recipe Ingredient was null");
    }

    final BatchExecuteStatementRequest batchExecuteStatementRequest = new BatchExecuteStatementRequest()
        .withTransactionId(transactionId).withResourceArn(RESOURCE_ARN).withSecretArn(SECRET_ARN).withDatabase(DATABASE)
        .withSql(POST_RECIPE_INGREDIENTS_SQL).withParameterSets(recipeIngredientParameters);

    return this.rdsData.batchExecuteStatement(batchExecuteStatementRequest);
  }

  private BatchExecuteStatementResult executeRecipeTagsSql(final String recipeId, final List<String> tagIds,
      final String sql, final String transactionId) {
    if (transactionId == null || transactionId.isEmpty()) {
      throw new IllegalArgumentException("transactionId cannot be null or empty");
    }

    Collection<List<SqlParameter>> recipeTagParameters = new ArrayList<>();

    try {
      for (String tagId : tagIds) {
        List<SqlParameter> parameters = new ArrayList<>();
        parameters.add(new SqlParameter().withName("tagId").withValue(new Field().withStringValue(tagId)));
        parameters.add(new SqlParameter().withName("recipeId").withValue(new Field().withStringValue(recipeId)));

        recipeTagParameters.add(parameters);
      }
    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input Recipe Tag was null");
    }

    final BatchExecuteStatementRequest batchExecuteStatementRequest = new BatchExecuteStatementRequest()
        .withTransactionId(transactionId).withResourceArn(RESOURCE_ARN).withSecretArn(SECRET_ARN).withDatabase(DATABASE)
        .withSql(sql).withParameterSets(recipeTagParameters);

    return this.rdsData.batchExecuteStatement(batchExecuteStatementRequest);
  }

  private String beginTransaction() {
    final BeginTransactionRequest beginTransactionRequest = new BeginTransactionRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE);
    final BeginTransactionResult beginTransactionResult = this.rdsData.beginTransaction(beginTransactionRequest);

    return beginTransactionResult.getTransactionId();
  }

  private void commitTransaction(final String transactionId) {
    if (transactionId == null || transactionId.isEmpty()) {
      throw new IllegalArgumentException("transactionId cannot be null or empty");
    }

    this.rdsData.commitTransaction(new CommitTransactionRequest().withTransactionId(transactionId)
        .withResourceArn(RESOURCE_ARN).withSecretArn(SECRET_ARN));
  }
}