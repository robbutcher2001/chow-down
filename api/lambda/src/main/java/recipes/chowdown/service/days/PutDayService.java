package recipes.chowdown.service.days;

import java.util.List;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import recipes.chowdown.domain.Day;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.DayRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

public class PutDayService implements RequestHandler<Day, Day> {

  private static LambdaLogger LOGGER;

  private DayRepository repository;

  private CacheInvalidator cacheInvalidator;

  private GetDaysService getDaysService;

  public PutDayService() {
    this.repository = new DayRepository();
    this.cacheInvalidator = new CacheInvalidator();
    this.getDaysService = new GetDaysService();
  }

  public Day handleRequest(final Day day, final Context context) throws RuntimeException {
    try {
      LOGGER = context.getLogger();
      Day dayToReturn = null;

      ExecuteStatementResult result = this.repository.putDay(day);

      if (result.getRecords().size() != 1) {
        throw new ResourceNotPersistedException("inconsistent number of rows returned after PUT");
      }

      final int rowIndex = 0;
      final int columnIndex = 0;
      final String returnedDate = result.getRecords().get(rowIndex).get(columnIndex).getStringValue();

      if (returnedDate.isEmpty()) {
        throw new ResourceNotPersistedException("no date confirmation returned from database");
      }

      LOGGER.log("New day persisted with date [" + returnedDate + "]");

      if (day.getRecipeId() != null) {
        final List<Day> newDays = this.getDaysService.getDays(day.getDate(), day.getDate(), context);

        if (newDays.size() == 1) {
          dayToReturn = newDays.get(0);
        } else {
          throw new ResourceNotPersistedException("inconsistent number of rows returned after GET");
        }
      } else {
        dayToReturn = day;
      }

      String response = this.cacheInvalidator.invalidate(Endpoint.DAY);
      LOGGER.log("Day cache purge status [" + response + "]");

      return dayToReturn;
    } catch (AmazonServiceException ase) {
      LOGGER.log(ase.getMessage());
      throw new ServerException("unable to complete request");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}