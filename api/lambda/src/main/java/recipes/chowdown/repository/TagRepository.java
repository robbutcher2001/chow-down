package recipes.chowdown.repository;

import java.util.ArrayList;
import java.util.Collection;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;
import com.amazonaws.services.rdsdata.model.SqlParameter;

import recipes.chowdown.domain.Tag;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

public class TagRepository {
  private static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
  private static final String SECRET_ARN = System.getenv("SECRET_ARN");
  private static final String DATABASE = System.getenv("DATABASE_NAME");

  private static final String GET_SQL = "SELECT t.id, t.name, t.background_colour, t.text_colour FROM chow.tags t";
  private static final String PUT_SQL = "INSERT INTO chow.tags (id, name, background_colour, text_colour) "
      + "VALUES (DEFAULT, :name, :background_colour, :text_colour) RETURNING id";

  private AWSRDSData rdsData;

  public TagRepository() {
    this.rdsData = AWSRDSDataClient.builder().build();
  }

  public ExecuteStatementResult getTags() {
    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_SQL));
  }

  public ExecuteStatementResult putTag(final Tag tag) {
    Collection<SqlParameter> parameters = new ArrayList<>();

    try {
      // TODO: unit test .toLowerCase().trim()
      parameters.add(new SqlParameter().withName("name")
          .withValue(new Field().withStringValue(tag.getName().toLowerCase().trim())));
      parameters.add(new SqlParameter().withName("background_colour")
          .withValue(new Field().withStringValue(tag.getColours().getBackground().toLowerCase().trim())));
      parameters.add(new SqlParameter().withName("text_colour")
          .withValue(new Field().withStringValue(tag.getColours().getText().toLowerCase().trim())));
    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input Tag was null");
    }

    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(PUT_SQL).withParameters(parameters));
  }
}