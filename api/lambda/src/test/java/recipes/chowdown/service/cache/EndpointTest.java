package recipes.chowdown.service.cache;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class EndpointTest {

    @Test
    void unitEndpoint_shouldReturnName_whenConvertedToString() throws Exception {
        assertEquals("UNIT", Endpoint.UNIT.toString());
    }

    @Test
    void unitEndpoint_shouldReturnCorrectPath_whenCalledPath() throws Exception {
        assertEquals("/api/units", Endpoint.UNIT.getPath());
    }

    @Test
    void ingredientEndpoint_shouldReturnName_whenConvertedToString() throws Exception {
        assertEquals("INGREDIENT", Endpoint.INGREDIENT.toString());
    }

    @Test
    void ingredientEndpoint_shouldReturnCorrectPath_whenCalledPath() throws Exception {
        assertEquals("/api/ingredients", Endpoint.INGREDIENT.getPath());
    }

    @Test
    void recipeEndpoint_shouldReturnName_whenConvertedToString() throws Exception {
        assertEquals("RECIPE", Endpoint.RECIPE.toString());
    }

    @Test
    void recipeEndpoint_shouldReturnCorrectPath_whenCalledPath() throws Exception {
        assertEquals("/api/recipes", Endpoint.RECIPE.getPath());
    }

    @Test
    void dayEndpoint_shouldReturnName_whenConvertedToString() throws Exception {
        assertEquals("DAY", Endpoint.DAY.toString());
    }

    @Test
    void dayEndpoint_shouldReturnCorrectPath_whenCalledPath() throws Exception {
        assertEquals("/api/days", Endpoint.DAY.getPath());
    }

    @Test
    void tagEndpoint_shouldReturnName_whenConvertedToString() throws Exception {
        assertEquals("TAG", Endpoint.TAG.toString());
    }

    @Test
    void tagEndpoint_shouldReturnCorrectPath_whenCalledPath() throws Exception {
        assertEquals("/api/tags", Endpoint.TAG.getPath());
    }
}