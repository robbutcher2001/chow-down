package recipes.chowdown.service.days;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetRequest {
  private String from;
  private String to;
}