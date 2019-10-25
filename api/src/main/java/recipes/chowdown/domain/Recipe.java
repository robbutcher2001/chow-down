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
    private long rating;
    private String url;
    private String image;
}