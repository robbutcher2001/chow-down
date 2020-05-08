package recipes.chowdown;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.github.javafaker.Faker;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import recipes.chowdown.schema.ApiApi;
import recipes.chowdown.schema.Day;
import recipes.chowdown.schema.Ingredient;
import recipes.chowdown.schema.Recipe;
import recipes.chowdown.schema.RecipeIngredient;
import recipes.chowdown.schema.Unit;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class ServiceMock implements ApiApi {

  static final String IMAGE_URL = "https://source.unsplash.com/random";

  final Faker faker;
  final List<Unit> units = new ArrayList<>();
  final List<Ingredient> ingredients = new ArrayList<>();
  final List<Recipe> recipes = new ArrayList<>();
  final List<Day> days = new ArrayList<>();
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
      // recipe.setImage(getRandomImageUrl());
      recipe.setImage(this.faker.internet().image());
      recipe.setCreatedDate(ZonedDateTime.now().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));

      List<RecipeIngredient> ingredients = new ArrayList<>();

      for (int j = 0; j < new Random().nextInt(40); j++) {
        RecipeIngredient recipeIngredient = new RecipeIngredient();
        recipeIngredient.setQuantity(new BigDecimal(this.faker.random().nextInt(0, 40)));

        String measurement = this.faker.food().measurement();
        if (measurement.contains(" ")) {
          measurement = measurement.split(" ")[1];
        }

        recipeIngredient.setUnitSingularName(measurement);
        recipeIngredient.setUnitPluralName(measurement.concat("s"));
        recipeIngredient.setIngredientName(this.faker.food().ingredient());
        ingredients.add(recipeIngredient);
      }

      recipe.setIngredients(ingredients);

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

    for (int i = 0; i < 7; i++) {
      if (i != 0 && i != 3 && i != 5) {
        Day day = new Day();
        day.setDate(LocalDate.now().plusDays(i).format(DateTimeFormatter.BASIC_ISO_DATE));
        day.setRecipe(this.recipes.get(i));

        this.days.add(day);
      }
      if (i == 5) {
        Day day = new Day();
        day.setDate(LocalDate.now().plusDays(i).format(DateTimeFormatter.BASIC_ISO_DATE));
        day.setAlternateDay("BBQ day");

        this.days.add(day);
      }
    }
  }

  private void randomSleep(int seed) {
    try {
      TimeUnit.SECONDS.sleep(new Random().nextInt(seed));
    } catch (InterruptedException ie) {
      Thread.currentThread().interrupt();
    }
  }

  private String getRandomImageUrl() {
    System.out.println("Retrieving random image URL");
    randomSleep(5);

    String randomImageUrl = "";
    HttpURLConnection connection = null;

    try {
      HttpURLConnection.setFollowRedirects(false);
      connection = (HttpURLConnection) new URL(IMAGE_URL).openConnection();
      randomImageUrl = connection.getHeaderField("location");
    } catch (IOException ioe) {
      ioe.printStackTrace();
    } finally {
      if (connection != null) {
        connection.disconnect();
      }
    }

    return randomImageUrl;
  }

  @Override
  public ResponseEntity<List<Unit>> apiUnitsGet() {
    if (initRequest) {
      initRequest = !initRequest;
      return new ResponseEntity<List<Unit>>(Collections.emptyList(), HttpStatus.OK);
    }

    randomSleep(2);

    return new ResponseEntity<List<Unit>>(this.units, HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Unit> apiUnitsPost(@Valid Unit unit) {
    unit.setId(this.faker.internet().uuid());
    this.units.add(unit);

    randomSleep(2);

    return new ResponseEntity<>(unit, HttpStatus.CREATED);
  }

  @Override
  public ResponseEntity<List<Ingredient>> apiIngredientsGet() {
    if (initRequest) {
      initRequest = !initRequest;
      return new ResponseEntity<List<Ingredient>>(Collections.emptyList(), HttpStatus.OK);
    }

    randomSleep(2);

    return new ResponseEntity<List<Ingredient>>(this.ingredients, HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Ingredient> apiIngredientsPost(@Valid Ingredient ingredient) {
    ingredient.setId(this.faker.internet().uuid());
    this.ingredients.add(ingredient);

    randomSleep(2);

    return new ResponseEntity<>(ingredient, HttpStatus.CREATED);
  }

  @Override
  public ResponseEntity<List<Recipe>> apiRecipesGet() {
    if (initRequest) {
      initRequest = !initRequest;
      return new ResponseEntity<List<Recipe>>(Collections.emptyList(), HttpStatus.OK);
    }

    randomSleep(2);

    return new ResponseEntity<List<Recipe>>(this.recipes, HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Recipe> apiRecipesPost(@Valid Recipe recipe) {
    recipe.setId(this.faker.internet().uuid());
    this.recipes.add(recipe);

    randomSleep(2);

    return new ResponseEntity<>(recipe, HttpStatus.CREATED);
  }

  @Override
  public ResponseEntity<List<Day>> apiDaysGet(@NotNull @Valid String from, @NotNull @Valid String to) {
    if (initRequest) {
      initRequest = !initRequest;
      return new ResponseEntity<List<Day>>(Collections.emptyList(), HttpStatus.OK);
    }

    randomSleep(2);

    return new ResponseEntity<List<Day>>(this.days.stream()
        .filter(day -> day.getRecipe() != null || day.getAlternateDay() != null).collect(Collectors.toList()),
        HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Day> apiDaysPut(@Valid Day newDay) {
    randomSleep(2);
    final String alternateDay = newDay.getAlternateDay();
    Recipe recipeToAdd = null;

    if (newDay.getRecipeId() != null) {
      Optional<Recipe> existingRecipe = this.recipes.stream()
          .filter(recipe -> newDay.getRecipeId().equals(recipe.getId())).findFirst();

      if (!existingRecipe.isPresent()) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }

      recipeToAdd = existingRecipe.get();
    }

    Optional<Day> existingDay = this.days.stream().filter(day -> newDay.getDate().equals(day.getDate())).findFirst();

    if (existingDay.isPresent()) {
      if (alternateDay != null) {
        existingDay.get().setAlternateDay(alternateDay);
        existingDay.get().setRecipe(null);
      } else {
        existingDay.get().setAlternateDay(null);
        existingDay.get().setRecipe(recipeToAdd);
      }
    } else {
      if (alternateDay != null) {
        newDay.setAlternateDay(alternateDay);
      } else {
        newDay.setRecipe(recipeToAdd);
      }
      this.days.add(newDay);
    }

    Optional<Day> subsequentDatabaseGet = this.days.stream().filter(day -> newDay.getDate().equals(day.getDate()))
        .findFirst();

    if (!subsequentDatabaseGet.isPresent()) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new ResponseEntity<Day>(subsequentDatabaseGet.get(), HttpStatus.OK);
  }
}