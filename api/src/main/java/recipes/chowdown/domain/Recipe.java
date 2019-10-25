package recipes.chowdown.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Recipe {
    private String id;
    private String title;
    private String description;
    private String rating;
    private String url;
    private String image;
}