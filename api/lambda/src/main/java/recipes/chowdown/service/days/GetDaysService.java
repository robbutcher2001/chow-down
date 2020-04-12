package recipes.chowdown.service.days;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
import recipes.chowdown.repository.DayRepository;

public class GetDaysService implements RequestHandler<GetRequest, List<Day>> {

  private static LambdaLogger LOGGER;

  private DayRepository repository;

  public GetDaysService() {
    this.repository = new DayRepository();
  }

  public List<Day> handleRequest(final GetRequest request, final Context context) {
    try {
      LOGGER = context.getLogger();

      if (request.getFrom() == null || request.getFrom().isEmpty() || !validateRequestDate(request.getFrom())) {
        throw new IllegalArgumentException("from date cannot be null or empty or invalid date");
      }

      if (request.getTo() == null || request.getTo().isEmpty() || !validateRequestDate(request.getTo())) {
        throw new IllegalArgumentException("to date cannot be null or empty or invalid date");
      }

      final List<Day> days = new ArrayList<>();

      ExecuteStatementResult result = this.repository.getDays(request.getFrom(), request.getTo());

      if (result.getRecords().size() < 1) {
        LOGGER.log("No days found");
      }

      for (List<Field> fields : result.getRecords()) {
        final String date = parseToBasicISODate(fields.get(0).getStringValue());
        Optional<Day> existingDay = days.stream().filter(day -> date.equals(day.getDate())).findFirst();

        if (!existingDay.isPresent()) {
          Recipe recipe = Recipe.builder().title(fields.get(1).getStringValue()).rating(fields.get(2).getLongValue())
              .image(fields.get(3).getStringValue()).build();
          recipe.setIngredients(Stream.of(buildRecipeIngredients(fields)).collect(Collectors.toList()));
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

  public List<Day> getDays(final String from, final String to, final Context context) {
    final GetRequest getRequest = GetRequest.builder().from(from).to(to).build();
    return handleRequest(getRequest, context);
  }

  private String parseToBasicISODate(final String date) {
    return LocalDate.parse(date).format(DateTimeFormatter.BASIC_ISO_DATE).toString();
  }

  private boolean validateRequestDate(final String date) {
    try {
      DateTimeFormatter.BASIC_ISO_DATE.parse(date);
    } catch (DateTimeParseException e) {
      return false;
    }
    return true;
  }

  private RecipeIngredient buildRecipeIngredients(final List<Field> fields) {
    return RecipeIngredient.builder().quantity(fields.get(4).getDoubleValue())
        .unitSingularName(fields.get(5).getStringValue()).unitPluralName(fields.get(6).getStringValue())
        .ingredientName(fields.get(7).getStringValue()).build();
  }
}