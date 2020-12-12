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
import recipes.chowdown.schema.NewRecipe;
import recipes.chowdown.schema.Recipe;
import recipes.chowdown.schema.RecipeIngredient;
import recipes.chowdown.schema.RecipeIngredientIngredient;
import recipes.chowdown.schema.RecipeIngredientUnit;
import recipes.chowdown.schema.Tag;
import recipes.chowdown.schema.TagColours;
import recipes.chowdown.schema.Unit;
import recipes.chowdown.schema.UpdateRecipe;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class ServiceMock implements ApiApi {

  static final String IMAGE_URL = "https://source.unsplash.com/random";
  static final String[][] COLOURS = new String[10][2];

  final Faker faker;
  final List<Unit> units = new ArrayList<>();
  final List<Ingredient> ingredients = new ArrayList<>();
  final List<Tag> tags = new ArrayList<>();
  final List<Recipe> recipes = new ArrayList<>();
  final List<Day> days = new ArrayList<>();
  boolean initRequest = true;
  final int TOTAL_UNITS = 12;
  final int TOTAL_INGREDIENTS = 120;
  final int TOTAL_TAGS = 10;

  public ServiceMock() {
    this.faker = new Faker();

    COLOURS[0][0] = "#005ea5";
    COLOURS[0][1] = "#ffffffd4";
    COLOURS[1][0] = "#17a2b8";
    COLOURS[1][1] = "#000000d4";
    COLOURS[2][0] = "#008672";
    COLOURS[2][1] = "#fff";
    COLOURS[3][0] = "#88b04b";
    COLOURS[3][1] = "#fff";
    COLOURS[4][0] = "#efc050";
    COLOURS[4][1] = "#000000e0";
    COLOURS[5][0] = "#d73a49";
    COLOURS[5][1] = "#fff";
    COLOURS[6][0] = "#c3447a";
    COLOURS[6][1] = "#fff";
    COLOURS[7][0] = "#d876e3";
    COLOURS[7][1] = "#000";
    COLOURS[8][0] = "#ff6f61";
    COLOURS[8][1] = "#000000e0";
    COLOURS[9][0] = "#6f42c1";
    COLOURS[9][1] = "#fff";

    for (int i = 0; i < this.TOTAL_UNITS; i++) {
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

    for (int i = 0; i < this.TOTAL_INGREDIENTS; i++) {
      Ingredient ingredient = new Ingredient();
      ingredient.setId(this.faker.internet().uuid());
      ingredient.setName(this.faker.food().ingredient());

      this.ingredients.add(ingredient);
    }

    for (int i = 0; i < this.TOTAL_TAGS; i++) {
      Tag tag = new Tag();
      tag.setId(this.faker.internet().uuid());
      tag.setName(this.faker.funnyName().name());

      TagColours colours = new TagColours();
      colours.setBackground(COLOURS[i][0]);
      colours.setText(COLOURS[i][1]);
      tag.setColours(colours);

      this.tags.add(tag);
    }

    for (int i = 0; i < 20; i++) {
      Recipe recipe = new Recipe();
      recipe.setId(this.faker.internet().uuid());
      recipe.setTitle(this.faker.food().dish());
      recipe.setDescription(this.faker.hitchhikersGuideToTheGalaxy().marvinQuote());
      recipe.setRating(this.faker.number().numberBetween(0, 6));
      recipe.setUrl(this.faker.internet().url() + "/" + this.faker.internet().domainWord());
      recipe.setImage(getRandomImageUrl());
      // recipe.setImage(this.faker.internet().image());
      recipe.setCreatedDate(ZonedDateTime.now().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));

      List<RecipeIngredient> recipeIngredients = new ArrayList<>();

      for (int j = 0; j < new Random().nextInt(40); j++) {
        RecipeIngredient recipeIngredient = new RecipeIngredient();
        recipeIngredient.setQuantity(new BigDecimal(this.faker.random().nextInt(0, 40)));
        // TODO: unit and ingredient POJOs added need to be auto-generated for domain in
        // api/lambda folder
        Unit unit = this.units.get(new Random().nextInt(this.TOTAL_UNITS));
        RecipeIngredientUnit newRecipeUnit = new RecipeIngredientUnit();
        newRecipeUnit.setId(unit.getId());
        newRecipeUnit.setSingular(unit.getSingular());
        newRecipeUnit.setPlural(unit.getPlural());
        recipeIngredient.setUnit(newRecipeUnit);

        Ingredient ingredient = this.ingredients.get(new Random().nextInt(this.TOTAL_INGREDIENTS));
        RecipeIngredientIngredient newRecipeIngredient = new RecipeIngredientIngredient();
        newRecipeIngredient.setId(ingredient.getId());
        newRecipeIngredient.setName(ingredient.getName());
        recipeIngredient.setIngredient(newRecipeIngredient);

        recipeIngredients.add(recipeIngredient);
      }

      recipe.setIngredients(recipeIngredients);

      for (int j = 0; j < new Random().nextInt(7); j++) {
        recipe.addTagsItem(this.tags.get(new Random().nextInt(this.TOTAL_TAGS)));
      }

      this.recipes.add(recipe);
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
  public ResponseEntity<NewRecipe> apiRecipesPost(@Valid NewRecipe newRecipe) {
    List<RecipeIngredient> recipeIngredients = new ArrayList<>();

    newRecipe.setId(this.faker.internet().uuid());
    newRecipe.getIngredients().forEach(payloadIngredient -> {
      RecipeIngredientUnit newRecipeUnit = new RecipeIngredientUnit();
      Unit existingUnit = this.units.stream().filter(unit -> unit.getId().equals(payloadIngredient.getUnit().getId()))
          .findFirst().orElse(null);

      newRecipeUnit.setId(existingUnit.getId());
      newRecipeUnit.setSingular(existingUnit.getSingular());
      newRecipeUnit.setPlural(existingUnit.getPlural());

      RecipeIngredientIngredient newRecipeIngredient = new RecipeIngredientIngredient();
      Ingredient existingIngredient = this.ingredients.stream()
          .filter(ingredient -> ingredient.getId().equals(payloadIngredient.getIngredient().getId())).findFirst()
          .orElse(null);

      newRecipeIngredient.setId(existingIngredient.getId());
      newRecipeIngredient.setName(existingIngredient.getName());

      RecipeIngredient recipeIngredient = new RecipeIngredient();
      recipeIngredient.setQuantity(payloadIngredient.getQuantity());
      recipeIngredient.setUnit(newRecipeUnit);
      recipeIngredient.setIngredient(newRecipeIngredient);

      recipeIngredients.add(recipeIngredient);
    });
    newRecipe.setIngredients(recipeIngredients);
    this.recipes.add(newRecipe);

    randomSleep(2);

    return new ResponseEntity<>(newRecipe, HttpStatus.CREATED);
  }

  @Override
  public ResponseEntity<UpdateRecipe> apiRecipesPut(@Valid UpdateRecipe updateRecipe) {
    UpdateRecipe updatedDatabaseGet = new UpdateRecipe();
    Optional<Recipe> existingRecipe = this.recipes.stream().filter(recipe -> recipe.getId().equals(updateRecipe.getId())).findFirst();

    if (!existingRecipe.isPresent()) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    else {
      existingRecipe.get().setTags(updateRecipe.getTags());
      updatedDatabaseGet.setId(existingRecipe.get().getId());
      updatedDatabaseGet.setTitle(existingRecipe.get().getTitle());
      updatedDatabaseGet.setDescription(existingRecipe.get().getDescription());
      updatedDatabaseGet.setRating(existingRecipe.get().getRating());
      updatedDatabaseGet.setUrl(existingRecipe.get().getUrl());
      updatedDatabaseGet.setImage(existingRecipe.get().getImage());
      updatedDatabaseGet.setIngredients(existingRecipe.get().getIngredients());
      updatedDatabaseGet.setTags(existingRecipe.get().getTags());
      updatedDatabaseGet.setCreatedDate(existingRecipe.get().getCreatedDate());
    }

    randomSleep(15);
    return new ResponseEntity<>(updatedDatabaseGet, HttpStatus.OK);
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

  @Override
  public ResponseEntity<List<Tag>> apiTagsGet() {
    if (initRequest) {
      initRequest = !initRequest;
      return new ResponseEntity<List<Tag>>(Collections.emptyList(), HttpStatus.OK);
    }

    randomSleep(2);

    return new ResponseEntity<List<Tag>>(this.tags, HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Tag> apiTagsPut(@Valid Tag tag) {
    tag.setId(this.faker.internet().uuid());
    this.tags.add(tag);

    randomSleep(2);

    return new ResponseEntity<>(tag, HttpStatus.CREATED);
  }
}