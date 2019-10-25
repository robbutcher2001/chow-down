package recipes.chowdown;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Recipe;

public class AuroraServerlessExample implements RequestHandler<Object, ApiRecipesResponse<Recipe>> {
  public static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
  public static final String SECRET_ARN = System.getenv("SECRET_ARN");

  public ApiRecipesResponse<Recipe> handleRequest(final Object input, final Context context) {
    final List<Recipe> recipes = new ArrayList<>();

    AWSRDSData rdsData = AWSRDSDataClient.builder().build();

    ExecuteStatementRequest request = new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase("postgres").withSql("select * from recipes");

    ExecuteStatementResult result = rdsData.executeStatement(request);

    for (List<Field> fields : result.getRecords()) {
      recipes.add(Recipe.builder()
        .id(fields.get(0).getStringValue())
        .title(fields.get(1).getStringValue())
        .description(fields.get(2).getStringValue())
        .rating(fields.get(3).getStringValue())
        .url(fields.get(4).getStringValue())
        .image(fields.get(5).getStringValue())
        .build());
    }

    return new ApiRecipesResponse<Recipe>(recipes);
  }
}