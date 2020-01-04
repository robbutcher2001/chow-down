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

public class IngredientRepository {
    static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
    static final String SECRET_ARN = System.getenv("SECRET_ARN");
    static final String DATABASE = "postgres";

    static final String GET_SQL = "SELECT i.id, i.ingredient FROM public.ingredients i";
    static final String PUT_SQL = "INSERT INTO public.ingredients (id, ingredient) "
            + "VALUES (DEFAULT, :ingredient) RETURNING id";

    final AWSRDSData rdsData;

    public IngredientRepository() {
        this.rdsData = AWSRDSDataClient.builder().build();
    }

    public ExecuteStatementResult getIngredients() {
        return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
                .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_SQL));
    }

    public ExecuteStatementResult putIngredient(final Ingredient ingredient) {
        Collection<SqlParameter> parameters = new ArrayList<>();

        parameters.add(new SqlParameter().withName("ingredient").withValue(new Field().withStringValue(ingredient.getIngredient())));

        return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
                .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(PUT_SQL).withParameters(parameters));
    }
}