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

public class UnitRepository {
    static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
    static final String SECRET_ARN = System.getenv("SECRET_ARN");
    static final String DATABASE = "postgres";

    static final String GET_SQL = "SELECT u.id, u.singular, u.plural FROM public.units u";
    static final String PUT_SQL = "INSERT INTO public.units (id, singular, plural) "
            + "VALUES (DEFAULT, :singular, :plural) RETURNING id";

    final AWSRDSData rdsData;

    public UnitRepository() {
        this.rdsData = AWSRDSDataClient.builder().build();
    }

    public ExecuteStatementResult getUnits() {
        return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
                .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(GET_SQL));
    }

    public ExecuteStatementResult putUnit(final Unit unit) {
        Collection<SqlParameter> parameters = new ArrayList<>();

        parameters.add(new SqlParameter().withName("singular").withValue(new Field().withStringValue(unit.getSingular())));
        parameters.add(new SqlParameter().withName("plural").withValue(new Field().withStringValue(unit.getPlural())));

        return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
                .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(PUT_SQL).withParameters(parameters));
    }
}