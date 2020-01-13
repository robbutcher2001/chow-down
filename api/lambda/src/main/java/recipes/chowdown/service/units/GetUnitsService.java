package recipes.chowdown.service.units;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.BadRequestException;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Unit;
import recipes.chowdown.exceptions.ResourcesNotFoundException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.UnitRepository;

public class GetUnitsService implements RequestHandler<Object, List<Unit>> {
  private static LambdaLogger logger;

  private UnitRepository repository;

  public GetUnitsService() {
    this.repository = new UnitRepository();
  }

  public List<Unit> handleRequest(final Object input, final Context context) {
    logger = context.getLogger();

    final List<Unit> units = new ArrayList<>();

    try {
      ExecuteStatementResult result = this.repository.getUnits();

      if (result.getRecords().size() < 1) {
        logger.log("No units found");
        throw new ResourcesNotFoundException("no units found");
      }

      for (List<Field> fields : result.getRecords()) {
        units.add(Unit.builder().id(fields.get(0).getStringValue()).singular(fields.get(1).getStringValue())
            .plural(fields.get(2).getStringValue()).build());
      }
    } catch (BadRequestException bre) {
      throw new ServerException("unable to complete request, issue communicating with database");
    }

    return units;
  }
}