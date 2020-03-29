package recipes.chowdown.repository;

import java.util.ArrayList;
import java.util.Collection;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;
import com.amazonaws.services.rdsdata.model.SqlParameter;

import recipes.chowdown.domain.Unit;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

public class UnitRepository {
  private static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
  private static final String SECRET_ARN = System.getenv("SECRET_ARN");
  private static final String DATABASE = System.getenv("DATABASE_NAME");

  private static final String GET_SQL = "SELECT u.id, u.singular, u.plural FROM chow.units u";
  private static final String PUT_SQL = "INSERT INTO chow.units (id, singular, plural) "
      + "VALUES (DEFAULT, :singular, :plural) RETURNING id";

  private AWSRDSData rdsData;

  public UnitRepository() {
    this.rdsData = AWSRDSDataClient.builder().build();
  }

  public ExecuteStatementResult getUnits() {
    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_SQL));
  }

  public ExecuteStatementResult putUnit(final Unit unit) {
    Collection<SqlParameter> parameters = new ArrayList<>();

    try {
      parameters
          .add(new SqlParameter().withName("singular").withValue(new Field().withStringValue(unit.getSingular())));
      parameters.add(new SqlParameter().withName("plural").withValue(new Field().withStringValue(unit.getPlural())));
    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input Unit was null");
    }

    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(PUT_SQL).withParameters(parameters));
  }
}