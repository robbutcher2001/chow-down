package recipes.chowdown.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    private String id;
    private String title;
    private String description;
    private Long rating;
    private String url;
    private String image;
}