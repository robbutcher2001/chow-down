package recipes.chowdown.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Recipe {
    private String id;
    private String title;
    private String description;
    private Long rating;
    private String url;
    private String image;
}