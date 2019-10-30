package recipes.chowdown;

import recipes.chowdown.schema.ApiApi;
import recipes.chowdown.schema.Recipe;
import org.springframework.http.ResponseEntity;

public class GetRecipesServiceMock implements ApiApi {

    public static void main(String[] a) {
        Recipe r = new Recipe();
        r.setTitle("hi");
        System.out.println("Mock running " + r.getTitle());
    }

    @Override
    public ResponseEntity<Void> apiRecipesGet() {
        return null;
    }

    @Override
    public ResponseEntity<Void> apiRecipesPost(Recipe recipe) {
        return null;
    }
}