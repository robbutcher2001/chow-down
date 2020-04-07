package recipes.chowdown.service.images;

import java.net.MalformedURLException;

import eu.maxschuster.dataurl.DataUrl;
import eu.maxschuster.dataurl.DataUrlSerializer;
import eu.maxschuster.dataurl.IDataUrlSerializer;

public class DataUrlService {

  private IDataUrlSerializer serialiser;

  public DataUrlService() {
    this.serialiser = new DataUrlSerializer();
  }

  public DataUrl decodeDataUrl(String encodedDataUrl) throws MalformedURLException {
    return this.serialiser.unserialize(encodedDataUrl);
  }
}