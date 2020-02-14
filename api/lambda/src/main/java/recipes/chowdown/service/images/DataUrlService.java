package recipes.chowdown.service.images;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.util.UUID;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;

import eu.maxschuster.dataurl.DataUrl;
import eu.maxschuster.dataurl.DataUrlSerializer;
import eu.maxschuster.dataurl.IDataUrlSerializer;

public class DataUrlService {

  private IDataUrlSerializer serialiser;

  public DataUrlService() {
    this.serialiser = new DataUrlSerializer();
  }

  public void decodeDataUrl(String encodedDataUrl) throws MalformedURLException {
    DataUrl dataUrl = this.serialiser.unserialize(encodedDataUrl);
    byte[] image = dataUrl.getData();
    InputStream imageStream = new ByteArrayInputStream(image);
    ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentLength(image.length);

    final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(Regions.DEFAULT_REGION).build();

    try {
      System.out.println(dataUrl.getMimeType());
      s3.putObject("butch-videos", "test-chow-images/" + UUID.randomUUID(), imageStream, objectMetadata);
    } catch (AmazonServiceException e) {
      System.out.println(e.getErrorMessage());
    }
  }
}