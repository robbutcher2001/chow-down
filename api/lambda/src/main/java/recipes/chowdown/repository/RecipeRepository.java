package recipes.chowdown.repository;

import java.util.ArrayList;
import java.util.Collection;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.BeginTransactionRequest;
import com.amazonaws.services.rdsdata.model.BeginTransactionResult;
import com.amazonaws.services.rdsdata.model.CommitTransactionRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;
import com.amazonaws.services.rdsdata.model.SqlParameter;
import com.amazonaws.services.rdsdata.model.TypeHint;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

public class RecipeRepository {
  private static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
  private static final String SECRET_ARN = System.getenv("SECRET_ARN");
  private static final String DATABASE = System.getenv("DATABASE_NAME");

  private static final String GET_SQL = "SELECT r.id, r.title, r.description, r.rating, r.url, r.image, r.created_date FROM chow.recipes r";
  private static final String PUT_SQL = "INSERT INTO chow.recipes (id, title, description, rating, url, image, created_date) "
      + "VALUES (DEFAULT, :title, :description, :rating, :url, :image, :createdDate) RETURNING id";

  private AWSRDSData rdsData;

  public RecipeRepository() {
    this.rdsData = AWSRDSDataClient.builder().build();
  }

  public ExecuteStatementResult getRecipes() {
    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_SQL));
  }

  public ExecuteStatementResult putRecipe(final Recipe recipe) {
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

    final String transactionId = beginTransaction();
    System.out.println("using transactionId " + transactionId);
    final ExecuteStatementRequest executeStatementRequest = new ExecuteStatementRequest()
        .withTransactionId(transactionId).withResourceArn(RESOURCE_ARN).withSecretArn(SECRET_ARN).withDatabase(DATABASE)
        .withSql(PUT_SQL).withParameters(parameters);
    final ExecuteStatementResult executeStatementResult = this.rdsData.executeStatement(executeStatementRequest);
    commitTransaction(transactionId);

    return executeStatementResult;
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