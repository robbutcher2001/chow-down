package recipes.chowdown;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.github.javafaker.Faker;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import recipes.chowdown.schema.ApiApi;
import recipes.chowdown.schema.Recipe;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class GetRecipesServiceMock implements ApiApi {

    final Faker faker;
    final List<Recipe> recipes = new ArrayList<>();

    public GetRecipesServiceMock() {
        this.faker = new Faker();

        for (int i = 0; i < 20; i++) {
            Recipe recipe = new Recipe();
            recipe.setId(this.faker.internet().uuid());
            recipe.setTitle(this.faker.food().dish());
            recipe.setDescription(this.faker.hitchhikersGuideToTheGalaxy().marvinQuote());
            recipe.setRating(this.faker.number().numberBetween(0, 6));
            recipe.setUrl(this.faker.internet().url() + "/" + this.faker.internet().domainWord());
            recipe.setImage(this.faker.internet().image());

            recipes.add(recipe);
        }
    }

    @Override
    public ResponseEntity<List<Recipe>> apiRecipesGet() {
        return new ResponseEntity<List<Recipe>>(this.recipes, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Recipe> apiRecipesPost(@Valid Recipe recipe) {
        recipe.setId(this.faker.internet().uuid());
        this.recipes.add(recipe);
        return new ResponseEntity<>(recipe, HttpStatus.ALREADY_REPORTED);
    }
}