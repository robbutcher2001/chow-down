package recipes.chowdown;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApiRecipesResponse<T> {
    private final Map<String, List<T>> data;

    public ApiRecipesResponse(final List<T> list) {
        this.data = new HashMap<>();
        this.data.put("recipes", list);
    }

    public Map<String, List<T>> getData() {
        return data;
    }
}