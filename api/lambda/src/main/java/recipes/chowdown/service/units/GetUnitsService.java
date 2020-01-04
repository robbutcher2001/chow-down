package recipes.chowdown.service.units;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Unit;
import recipes.chowdown.exceptions.ResourcesNotFoundException;
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

    ExecuteStatementResult result = this.repository.getUnits();

    if (result.getRecords().size() < 1) {
      logger.log("No units found");
      throw new ResourcesNotFoundException("No units found");
    }

    for (List<Field> fields : result.getRecords()) {
      units.add(Unit.builder().id(fields.get(0).getStringValue()).singular(fields.get(1).getStringValue())
          .plural(fields.get(2).getStringValue()).build());
    }

    return units;
  }
}