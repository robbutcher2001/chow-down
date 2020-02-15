package recipes.chowdown.repository;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.UUID;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;

public class S3Repository {
  private static final String IMAGES_BUCKET = System.getenv("IMAGES_BUCKET");
  private static final String IMAGE_BUCKET_PREFIX = "/images/";
  private static final String RECIPE_IMAGE_PREFIX = "recipes/";

  private AmazonS3 s3Client;

  public S3Repository() {
    this.s3Client = AmazonS3ClientBuilder.standard().withRegion(Regions.EU_WEST_1).build();
  }

  public String putRecipeImage(final byte[] image, final String contentType) {
    final String imageUuid = IMAGE_BUCKET_PREFIX + RECIPE_IMAGE_PREFIX.concat(UUID.randomUUID().toString());
    final InputStream imageStream = new ByteArrayInputStream(image);
    final ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentLength(image.length);
    objectMetadata.setContentType(contentType);

    this.s3Client.putObject(IMAGES_BUCKET, imageUuid, imageStream, objectMetadata);

    return imageUuid;
  }
}