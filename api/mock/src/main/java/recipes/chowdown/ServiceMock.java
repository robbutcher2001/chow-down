package recipes.chowdown;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import com.github.javafaker.Faker;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import recipes.chowdown.schema.ApiApi;
import recipes.chowdown.schema.Ingredient;
import recipes.chowdown.schema.Recipe;
import recipes.chowdown.schema.Unit;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class ServiceMock implements ApiApi {

    final Faker faker;
    final List<Unit> units = new ArrayList<>();
    final List<Ingredient> ingredients = new ArrayList<>();
    final List<Recipe> recipes = new ArrayList<>();
    boolean initRequest = true;

    public ServiceMock() {
        this.faker = new Faker();

        for (int i = 0; i < 20; i++) {
            Recipe recipe = new Recipe();
            recipe.setId(this.faker.internet().uuid());
            recipe.setTitle(this.faker.food().dish());
            recipe.setDescription(this.faker.hitchhikersGuideToTheGalaxy().marvinQuote());
            recipe.setRating(this.faker.number().numberBetween(0, 6));
            recipe.setUrl(this.faker.internet().url() + "/" + this.faker.internet().domainWord());
            recipe.setImage(this.faker.internet().image());

            this.recipes.add(recipe);
        }

        for (int i = 0; i < 12; i++) {
            Unit unit = new Unit();
            unit.setId(this.faker.internet().uuid());

            String measurement = this.faker.food().measurement();
            if (measurement.contains(" ")) {
                measurement = measurement.split(" ")[1];
            }

            unit.setSingular(measurement);
            unit.setPlural(measurement.concat("s"));

            this.units.add(unit);
        }

        for (int i = 0; i < 120; i++) {
            Ingredient ingredient = new Ingredient();
            ingredient.setId(this.faker.internet().uuid());
            ingredient.setIngredient(this.faker.food().ingredient());

            this.ingredients.add(ingredient);
        }
    }

    @Override
    public ResponseEntity<List<Unit>> apiUnitsGet() {
        if (initRequest) {
            initRequest = !initRequest;
            return new ResponseEntity<List<Unit>>(Collections.emptyList(), HttpStatus.GONE);
        }

        return new ResponseEntity<List<Unit>>(this.units, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Unit> apiUnitsPost(@Valid Unit unit) {
        unit.setId(this.faker.internet().uuid());
        this.units.add(unit);
        return new ResponseEntity<>(unit, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<Ingredient>> apiIngredientsGet() {
        if (initRequest) {
            initRequest = !initRequest;
            return new ResponseEntity<List<Ingredient>>(Collections.emptyList(), HttpStatus.GONE);
        }

        return new ResponseEntity<List<Ingredient>>(this.ingredients, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Ingredient> apiIngredientsPost(@Valid Ingredient ingredient) {
        ingredient.setId(this.faker.internet().uuid());
        this.ingredients.add(ingredient);
        return new ResponseEntity<>(ingredient, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<Recipe>> apiRecipesGet() {
        if (initRequest) {
            initRequest = !initRequest;
            return new ResponseEntity<List<Recipe>>(Collections.emptyList(), HttpStatus.GONE);
        }

        return new ResponseEntity<List<Recipe>>(this.recipes, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Recipe> apiRecipesPost(@Valid Recipe recipe) {
        recipe.setId(this.faker.internet().uuid());
        this.recipes.add(recipe);
        return new ResponseEntity<>(recipe, HttpStatus.CREATED);
    }
}