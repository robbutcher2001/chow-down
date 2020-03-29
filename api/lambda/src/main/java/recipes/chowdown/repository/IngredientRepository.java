package recipes.chowdown.repository;

import java.util.ArrayList;
import java.util.Collection;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;
import com.amazonaws.services.rdsdata.model.SqlParameter;

import recipes.chowdown.domain.Ingredient;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

public class IngredientRepository {
  private static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
  private static final String SECRET_ARN = System.getenv("SECRET_ARN");
  private static final String DATABASE = System.getenv("DATABASE_NAME");

  private static final String GET_SQL = "SELECT i.id, i.ingredient FROM chow.ingredients i";
  private static final String PUT_SQL = "INSERT INTO chow.ingredients (id, ingredient) "
      + "VALUES (DEFAULT, :ingredient) RETURNING id";

  private AWSRDSData rdsData;

  public IngredientRepository() {
    this.rdsData = AWSRDSDataClient.builder().build();
  }

  public ExecuteStatementResult getIngredients() {
    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_SQL));
  }

  public ExecuteStatementResult putIngredient(final Ingredient ingredient) {
    Collection<SqlParameter> parameters = new ArrayList<>();

    try {
      parameters.add(
          new SqlParameter().withName("ingredient").withValue(new Field().withStringValue(ingredient.getIngredient())));
    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input Ingredient was null");
    }

    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(PUT_SQL).withParameters(parameters));
  }
}