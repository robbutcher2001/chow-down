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
public class RecipeIngredient {
  private double quantity;
  private String unitId;
  private String unitSingularName;
  private String unitPluralName;
  private String ingredientId;
  private String ingredientName;
}