package recipes.chowdown.service.cache;

import java.util.UUID;

import com.amazonaws.services.cloudfront.AmazonCloudFront;
import com.amazonaws.services.cloudfront.AmazonCloudFrontClientBuilder;
import com.amazonaws.services.cloudfront.model.CreateInvalidationRequest;
import com.amazonaws.services.cloudfront.model.CreateInvalidationResult;
import com.amazonaws.services.cloudfront.model.InvalidationBatch;
import com.amazonaws.services.cloudfront.model.Paths;

//TODO: test but need to mock static AmazonCloudFrontClientBuilder
public class CacheInvalidator {
  private static final String DISTRIBUTION_ID = System.getenv("DISTRIBUTION_ID");

  public String invalidate(final Endpoint endpoint) {
    return this.invalidate(endpoint, null);
  }

  public String invalidate(final Endpoint endpoint, final QueryString queryStringItems) {
    AmazonCloudFront cloudFront = null;
    final String queryString = queryStringItems != null ? queryStringItems.toString() : "";

    try {
      cloudFront = AmazonCloudFrontClientBuilder.defaultClient();
      CreateInvalidationRequest invalidationRequest = new CreateInvalidationRequest(DISTRIBUTION_ID,
          createInvalidationBatch(endpoint.getPath() + queryString));
      CreateInvalidationResult result = cloudFront.createInvalidation(invalidationRequest);

      return result.getInvalidation().getStatus();
    } finally {
      if (cloudFront != null) {
        cloudFront.shutdown();
      }
    }
  }

  private InvalidationBatch createInvalidationBatch(final String path) {
    Paths paths = new Paths().withQuantity(1).withItems(path);

    return new InvalidationBatch(paths, UUID.randomUUID().toString());
  }
}