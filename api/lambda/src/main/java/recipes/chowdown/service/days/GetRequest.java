package recipes.chowdown.service.days;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
public class GetRequest {
  private String from;
  private String to;
}