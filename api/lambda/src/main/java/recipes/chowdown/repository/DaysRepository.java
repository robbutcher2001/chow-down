package recipes.chowdown.repository;

import java.util.ArrayList;
import java.util.Collection;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;
import com.amazonaws.services.rdsdata.model.SqlParameter;

import recipes.chowdown.exceptions.ResourceNotPersistedException;

//TODO: needs tests
public class DaysRepository {
  private static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
  private static final String SECRET_ARN = System.getenv("SECRET_ARN");
  private static final String DATABASE = System.getenv("DATABASE_NAME");

  private static final String GET_SQL = "SELECT d.date, r.title, r.rating, r.image, ri.quantity, u.singular, u.plural, i.ingredient "
  + "FROM chow.recipe_ingredients ri "
  + "INNER JOIN chow.units u "
  + "  ON u.id = ri.unit_id "
  + "INNER JOIN chow.ingredients i "
  + "  ON i.id = ri.ingredient_id "
  + "INNER JOIN chow.recipes r "
  + "  ON r.id = ri.recipe_id "
  + "INNER JOIN chow.days d "
  + "  ON d.recipe_id = r.id "
  + "  AND d.date BETWEEN :from AND :to "
  + "ORDER BY d.date, i.ingredient";

  private AWSRDSData rdsData;

  public DaysRepository() {
    this.rdsData = AWSRDSDataClient.builder().build();
  }

  public ExecuteStatementResult getDays(final String from, final String to) {
    Collection<SqlParameter> parameters = new ArrayList<>();

    try {
      parameters.add(new SqlParameter().withName("from").withValue(new Field().withStringValue(from)));
      parameters.add(new SqlParameter().withName("to").withValue(new Field().withStringValue(to)));
    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input dates were null");
    }

    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_SQL).withParameters(parameters));
  }
}