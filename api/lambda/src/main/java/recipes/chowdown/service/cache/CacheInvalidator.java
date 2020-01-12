package recipes.chowdown.service.cache;

import java.util.UUID;

import com.amazonaws.services.cloudfront.AmazonCloudFront;
import com.amazonaws.services.cloudfront.AmazonCloudFrontClientBuilder;
import com.amazonaws.services.cloudfront.model.CreateInvalidationRequest;
import com.amazonaws.services.cloudfront.model.CreateInvalidationResult;
import com.amazonaws.services.cloudfront.model.InvalidationBatch;
import com.amazonaws.services.cloudfront.model.Paths;

public class CacheInvalidator {
    static final String distributionId = System.getenv("DISTRIBUTION_ID");

    public static String invalidate(final String path) {
        AmazonCloudFront cloudFront = null;

        try {
            cloudFront = AmazonCloudFrontClientBuilder.defaultClient();
            CreateInvalidationRequest invalidationRequest = new CreateInvalidationRequest(distributionId,
                    createInvalidationBatch(path));
            CreateInvalidationResult result = cloudFront.createInvalidation(invalidationRequest);

            return result.getInvalidation().getStatus();
        } finally {
            if (cloudFront != null) {
                cloudFront.shutdown();
            }
        }
    }

    private static InvalidationBatch createInvalidationBatch(final String path) {
        Paths paths = new Paths().withQuantity(1).withItems(path);

        return new InvalidationBatch(paths, UUID.randomUUID().toString());
    }
}