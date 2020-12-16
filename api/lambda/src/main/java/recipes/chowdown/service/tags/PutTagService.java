package recipes.chowdown.service.tags;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import recipes.chowdown.domain.Tag;
import recipes.chowdown.exceptions.ResourceNotPersistedException;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.TagRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

public class PutTagService implements RequestHandler<Tag, Tag> {

  private static LambdaLogger LOGGER;

  private TagRepository repository;

  private CacheInvalidator cacheInvalidator;

  public PutTagService() {
    this.repository = new TagRepository();
    this.cacheInvalidator = new CacheInvalidator();
  }

  public Tag handleRequest(final Tag tag, final Context context) throws RuntimeException {
    try {
      LOGGER = context.getLogger();

      tag.setId(null);
      ExecuteStatementResult result = this.repository.putTag(tag);

      if (result.getRecords().size() != 1) {
        throw new ResourceNotPersistedException("inconsistent number of rows returned after PUT");
      }

      final int rowIndex = 0;
      final int columnIndex = 0;
      final String returnedId = result.getRecords().get(rowIndex).get(columnIndex).getStringValue();

      if (returnedId.isEmpty()) {
        throw new ResourceNotPersistedException("no ID returned from database");
      }

      LOGGER.log("New tag persisted with id [" + returnedId + "]");
      tag.setId(returnedId);

      String response = this.cacheInvalidator.invalidate(Endpoint.TAG);
      LOGGER.log("Tag cache purge status [" + response + "]");

      return tag;
    } catch (AmazonServiceException ase) {
      LOGGER.log(ase.getMessage());
      throw new ServerException("unable to complete request");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}