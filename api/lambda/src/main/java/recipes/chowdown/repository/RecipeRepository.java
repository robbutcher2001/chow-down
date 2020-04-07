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

  private static final String GET_SQL = "SELECT r.id, r.title, r.description, r.rating, r.url, r.image, r.created_date FROM chow.recipes r";
  private static final String PUT_RECIPE_BODY_SQL = "INSERT INTO chow.recipes (id, title, description, rating, url, image, created_date) "
      + "VALUES (DEFAULT, :title, :description, :rating, :url, :image, :createdDate) RETURNING id";
  private static final String PUT_RECIPE_INGREDIENTS_SQL = "INSERT INTO chow.recipe_ingredients (id, quantity, unit_id, ingredient_id, recipe_id) "
      + "VALUES (DEFAULT, :quantity, :unitId::uuid, :ingredientId::uuid, :recipeId::uuid) RETURNING id";

  private AWSRDSData rdsData;

  public RecipeRepository() {
    this.rdsData = AWSRDSDataClient.builder().build();
  }

  public ExecuteStatementResult getRecipes() {
    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_SQL));
  }

  public ExecuteStatementResult putRecipe(final Recipe recipe) {
    final String transactionId = beginTransaction();

    final ExecuteStatementResult executeStatementResult = putRecipeBody(recipe, transactionId);

    final int rowIndex = 0;
    final int columnIndex = 0;
    final String returnedId = executeStatementResult.getRecords().get(rowIndex).get(columnIndex).getStringValue();

    if (returnedId.isEmpty()) {
      throw new ResourceNotPersistedException("no ID returned from database");
    }

    recipe.setId(returnedId);
    putRecipeIngredients(recipe, transactionId);

    commitTransaction(transactionId);

    // TODO: should just return ID here as we've already extracted it but is pattern
    // change for all repositories. Maybe all repositories process the
    // `ExecuteStatementResult` and return object T to service (int, db count, id or
    // whatever)
    return executeStatementResult;
  }

  private ExecuteStatementResult putRecipeBody(final Recipe recipe, final String transactionId) {
    if (transactionId == null || transactionId.isEmpty()) {
      throw new IllegalArgumentException("transactionId cannot be null or empty");
    }

    if (recipe == null || recipe.getTitle() == null) {
      throw new IllegalArgumentException("recipe or recipe title cannot be null or empty");
    }

    Collection<SqlParameter> parameters = new ArrayList<>();

    try {
      parameters.add(new SqlParameter().withName("title").withValue(new Field().withStringValue(recipe.getTitle())));
      parameters.add(
          new SqlParameter().withName("description").withValue(new Field().withStringValue(recipe.getDescription())));
      parameters.add(new SqlParameter().withName("rating").withValue(new Field().withLongValue(recipe.getRating())));
      parameters.add(new SqlParameter().withName("url").withValue(new Field().withStringValue(recipe.getUrl())));
      parameters.add(new SqlParameter().withName("image").withValue(new Field().withStringValue(recipe.getImage())));
      parameters.add(new SqlParameter().withName("createdDate")
          .withValue(new Field().withStringValue(recipe.getCreatedDate())).withTypeHint(TypeHint.TIMESTAMP));
    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input Recipe was null");
    }

    final ExecuteStatementRequest executeStatementRequest = new ExecuteStatementRequest()
        .withTransactionId(transactionId).withResourceArn(RESOURCE_ARN).withSecretArn(SECRET_ARN).withDatabase(DATABASE)
        .withSql(PUT_RECIPE_BODY_SQL).withParameters(parameters);

    return this.rdsData.executeStatement(executeStatementRequest);
  }

  private BatchExecuteStatementResult putRecipeIngredients(final Recipe recipe, final String transactionId) {
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
            new SqlParameter().withName("unitId").withValue(new Field().withStringValue(recipeIngredient.getUnitId())));
        parameters.add(new SqlParameter().withName("ingredientId")
            .withValue(new Field().withStringValue(recipeIngredient.getIngredientId())));
        parameters.add(new SqlParameter().withName("recipeId").withValue(new Field().withStringValue(recipe.getId())));

        recipeIngredientParameters.add(parameters);
      }
    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input Recipe Ingredient was null");
    }

    final BatchExecuteStatementRequest batchExecuteStatementRequest = new BatchExecuteStatementRequest()
        .withTransactionId(transactionId).withResourceArn(RESOURCE_ARN).withSecretArn(SECRET_ARN).withDatabase(DATABASE)
        .withSql(PUT_RECIPE_INGREDIENTS_SQL).withParameterSets(recipeIngredientParameters);

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