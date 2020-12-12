package recipes.chowdown.service.tags;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Colour;
import recipes.chowdown.domain.Tag;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.TagRepository;

public class GetTagsService implements RequestHandler<Object, List<Tag>> {

  private static LambdaLogger LOGGER;

  private TagRepository repository;

  public GetTagsService() {
    this.repository = new TagRepository();
  }

  public List<Tag> handleRequest(final Object input, final Context context) {
    try {
      LOGGER = context.getLogger();

      final List<Tag> tags = new ArrayList<>();

      ExecuteStatementResult result = this.repository.getTags();

      if (result.getRecords().size() < 1) {
        LOGGER.log("No tags found");
      }

      for (List<Field> fields : result.getRecords()) {
        tags.add(Tag.builder().id(fields.get(0).getStringValue()).name(fields.get(1).getStringValue()).colours(
            Colour.builder().background(fields.get(2).getStringValue()).text(fields.get(3).getStringValue()).build())
            .build());
      }

      return tags;
    } catch (AmazonServiceException ase) {
      LOGGER.log(ase.getMessage());
      throw new ServerException("unable to complete request");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}