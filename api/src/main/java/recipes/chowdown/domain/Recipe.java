package recipes.chowdown.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
// @Builder
// @Data
@Builder
public class Recipe {
    private String id;
    private String title;
    private String description;
    private String rating;
    private String url;
    private String image;
}