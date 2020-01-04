package recipes.chowdown.service.units;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import recipes.chowdown.ApiResponse;
import recipes.chowdown.domain.Unit;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.UnitRepository;

public class PutUnitService implements RequestHandler<Unit, ApiResponse<Unit>> {

  private static LambdaLogger logger;

  private UnitRepository repository;

  public PutUnitService() {
    this.repository = new UnitRepository();
  }

  public ApiResponse<Unit> handleRequest(final Unit unit, final Context context) throws RuntimeException {
    try {
      logger = context.getLogger();

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

      logger.log("New unit persisted with id [" + returnedId + "]");
      unit.setId(returnedId);

      return new ApiResponse<Unit>("unit", unit);
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}