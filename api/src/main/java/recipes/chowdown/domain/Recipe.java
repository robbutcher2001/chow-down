package recipes.chowdown.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Recipe {
    private String id;
    private String title;
    private String url;
    private String description;
    private String image;
}