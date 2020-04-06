package recipes.chowdown.service.days;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Day;
import recipes.chowdown.domain.Recipe;
import recipes.chowdown.domain.RecipeIngredient;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.DaysRepository;

//TODO: needs tests
public class GetDaysService implements RequestHandler<Object, List<Day>> {

  private static LambdaLogger LOGGER;

  private DaysRepository repository;

  public GetDaysService() {
    this.repository = new DaysRepository();
  }

  public List<Day> handleRequest(final Object input, final Context context) {
    try {
      LOGGER = context.getLogger();

      LOGGER.log(input.toString());

      final List<Day> days = new ArrayList<>();

      ExecuteStatementResult result = this.repository.getDays();

      if (result.getRecords().size() < 1) {
        LOGGER.log("No days found");
      }

      for (List<Field> fields : result.getRecords()) {
        final String date = fields.get(0).getStringValue();
        Optional<Day> existingDay = days.stream().filter(day -> date.equals(day.getDate())).findFirst();

        // TODO: do we even need to initialise ingredients(Collections.emptyList())
        if (!existingDay.isPresent()) {
          Recipe recipe = Recipe.builder().title(fields.get(1).getStringValue()).rating(fields.get(2).getLongValue())
              .image(fields.get(3).getStringValue()).ingredients(new ArrayList<>()).build();
          recipe.getIngredients().add(buildRecipeIngredients(fields));
          days.add(Day.builder().date(date).recipe(recipe).build());
        } else {
          existingDay.get().getRecipe().getIngredients().add(buildRecipeIngredients(fields));
        }
      }

      return days;
    } catch (AmazonServiceException ase) {
      LOGGER.log(ase.getMessage());
      throw new ServerException("unable to complete request");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }

  private RecipeIngredient buildRecipeIngredients(final List<Field> fields) {
    return RecipeIngredient.builder().quantity(fields.get(4).getLongValue())
        .unitSingularName(fields.get(5).getStringValue()).unitPluralName(fields.get(6).getStringValue())
        .ingredientName(fields.get(7).getStringValue()).build();
  }
}