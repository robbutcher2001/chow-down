package recipes.chowdown.service.units;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.BadRequestException;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import recipes.chowdown.domain.Unit;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.UnitRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

public class PutUnitService implements RequestHandler<Unit, Unit> {

  private static LambdaLogger LOGGER;

  private UnitRepository repository;

  private CacheInvalidator cacheInvalidator;

  public PutUnitService() {
    this.repository = new UnitRepository();
    this.cacheInvalidator = new CacheInvalidator();
  }

  public Unit handleRequest(final Unit unit, final Context context) throws RuntimeException {
    try {
      LOGGER = context.getLogger();

      unit.setId(null);
      ExecuteStatementResult result = this.repository.putUnit(unit);

      if (result.getRecords().size() != 1) {
        throw new ResourceNotPersistedException("inconsistent number of rows returned after PUT");
      }

      final int rowIndex = 0;
      final int columnIndex = 0;
      final String returnedId = result.getRecords().get(rowIndex).get(columnIndex).getStringValue();

      if (returnedId.isEmpty()) {
        throw new ResourceNotPersistedException("no ID returned from database");
      }

      LOGGER.log("New unit persisted with id [" + returnedId + "]");
      unit.setId(returnedId);

      String response = this.cacheInvalidator.invalidate(Endpoint.UNIT);
      LOGGER.log("Unit cache purge status [" + response + "]");

      return unit;
    } catch (BadRequestException bre) {
      throw new ServerException("unable to complete request, issue communicating with database");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}