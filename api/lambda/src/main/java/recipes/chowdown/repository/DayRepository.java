package recipes.chowdown.repository;

import java.util.ArrayList;
import java.util.Collection;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.AWSRDSDataClient;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;
import com.amazonaws.services.rdsdata.model.SqlParameter;

import recipes.chowdown.domain.Day;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

public class DayRepository {
  private static final String RESOURCE_ARN = System.getenv("RESOURCE_ARN");
  private static final String SECRET_ARN = System.getenv("SECRET_ARN");
  private static final String DATABASE = System.getenv("DATABASE_NAME");

  private static final String GET_SQL = "SELECT * "
    + "FROM ("
    + "  SELECT d.date, d.alternate_day, r.title, r.rating, r.image, r.url, ri.quantity, u.id, u.singular, u.plural, i.id, i.ingredient "
    + "  FROM chow.recipe_ingredients ri "
    + "  INNER JOIN chow.units u "
    + "    ON u.id = ri.unit_id "
    + "  INNER JOIN chow.ingredients i "
    + "    ON i.id = ri.ingredient_id "
    + "  INNER JOIN chow.recipes r "
    + "    ON r.id = ri.recipe_id "
    + "  INNER JOIN chow.days d "
    + "    ON d.recipe_id = r.id "
    + "    AND d.date BETWEEN :from::date AND :to::date "
    + "UNION "
    + "  SELECT d.date, d.alternate_day, null, -1, null, null, -1, null, null, null, null, null "
    + "  FROM chow.days d "
    + "  WHERE d.alternate_day IS NOT NULL "
    + "    AND d.date BETWEEN :from::date AND :to::date "
    + ") wrapper "
    + "ORDER BY wrapper.date, wrapper.quantity, wrapper.singular, wrapper.ingredient";

  private static final String PUT_SQL = "INSERT INTO chow.days (date, recipe_id, alternate_day) "
    + "VALUES (:date::date, :recipeId::uuid, :alternateDay) "
    + "ON CONFLICT (date) DO UPDATE "
    + "  SET recipe_id = EXCLUDED.recipe_id, alternate_day = EXCLUDED.alternate_day "
    + "RETURNING date";

  private AWSRDSData rdsData;

  public DayRepository() {
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

  public ExecuteStatementResult putDay(final Day day) {
    Collection<SqlParameter> parameters = new ArrayList<>();

    try {
      parameters.add(new SqlParameter().withName("date").withValue(new Field().withStringValue(day.getDate())));

      if (day.getRecipeId() != null) {
        parameters.add(new SqlParameter().withName("recipeId").withValue(new Field().withStringValue(day.getRecipeId())));
        parameters.add(new SqlParameter().withName("alternateDay").withValue(new Field().withIsNull(true)));
      } else if (day.getAlternateDay() != null) {
        parameters.add(new SqlParameter().withName("recipeId").withValue(new Field().withIsNull(true)));
        parameters.add(new SqlParameter().withName("alternateDay").withValue(new Field().withStringValue(day.getAlternateDay().trim())));
      } else {
        parameters.add(new SqlParameter().withName("recipeId").withValue(new Field().withIsNull(true)));
        parameters.add(new SqlParameter().withName("alternateDay").withValue(new Field().withIsNull(true)));
      }

    } catch (NullPointerException npe) {
      throw new ResourceNotPersistedException("part or all of the input Day was null");
    }

    return this.rdsData.executeStatement(new ExecuteStatementRequest().withResourceArn(RESOURCE_ARN)
        .withSecretArn(SECRET_ARN).withDatabase(DATABASE).withSql(PUT_SQL).withParameters(parameters));
  }
}