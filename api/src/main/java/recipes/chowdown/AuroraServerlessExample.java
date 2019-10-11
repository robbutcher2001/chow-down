package recipes.chowdown;

import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import org.apache.http.HttpStatus;

public class AuroraServerlessExample implements RequestHandler<Object, Object> {
  public static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
  public static final String SECRET_ARN = System.getenv("SECRET_ARN");

  public Object handleRequest(final Object input, final Context context) {
    AWSRDSData rdsData = AWSRDSDataClient.builder().build();

    ExecuteStatementRequest request = new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase("postgres").withSql("select * from recipes");

    ExecuteStatementResult result = rdsData.executeStatement(request);

    final String fakeWrapper = "{\"status\": \"bosh\", \"data\": {\"recipes\":[";
    StringBuilder sb = new StringBuilder(fakeWrapper);

    int count = 1;
    for (List<Field> fields : result.getRecords()) {

      sb.append("{");

      sb.append("\"id\": \"" + fields.get(0).getStringValue() + "\",");
      sb.append("\"title\": \"" + fields.get(1).getStringValue() + "\",");
      sb.append("\"url\": \"" + fields.get(2).getStringValue() + "\",");
      sb.append("\"description\": \"" + fields.get(3).getStringValue() + "\",");
      sb.append("\"image\": \"none\"");

      System.out.println(result.getRecords().size());
      if (count < result.getRecords().size()) {
        sb.append("},");
      }
      else {
        sb.append("}");
      }

      System.out.println(String.format("Fetched row: id [%s]", fields.get(0).getStringValue()));

      count++;
    }

    sb.append("]}}");

    return new ApigResponse(HttpStatus.SC_OK, sb.toString());
  }
}