package recipes.chowdown.repository;

import java.util.ArrayList;
import java.util.Collection;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;
import com.amazonaws.services.rdsdata.model.SqlParameter;

import recipes.chowdown.domain.Recipe;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

public class RecipeRepository {
    static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
    static final String SECRET_ARN = System.getenv("SECRET_ARN");
    static final String DATABASE = System.getenv("DATABASE_NAME");

    static final String GET_SQL = "SELECT r.id, r.title, r.description, r.rating, r.url, r.image FROM public.recipes r";
    static final String PUT_SQL = "INSERT INTO public.recipes (id, title, description, rating, url, image) "
            + "VALUES (DEFAULT, :title, :description, :rating, :url, :image) RETURNING id";

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
            parameters.add(
                    new SqlParameter().withName("title").withValue(new Field().withStringValue(recipe.getTitle())));
            parameters.add(new SqlParameter().withName("description")
                    .withValue(new Field().withStringValue(recipe.getDescription())));
            parameters.add(
                    new SqlParameter().withName("rating").withValue(new Field().withLongValue(recipe.getRating())));
            parameters.add(new SqlParameter().withName("url").withValue(new Field().withStringValue(recipe.getUrl())));
            parameters.add(
                    new SqlParameter().withName("image").withValue(new Field().withStringValue(recipe.getImage())));
        } catch (NullPointerException npe) {
            throw new ResourceNotPersistedException("part or all of the input Recipe was null");
        }

        return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
                .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(PUT_SQL).withParameters(parameters));
    }
}