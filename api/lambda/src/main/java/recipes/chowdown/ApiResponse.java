package recipes.chowdown;

import java.util.HashMap;
import java.util.Map;

public class ApiResponse<T> {
    private final Map<String, T> data;

    public ApiResponse(final String name, final T t) {
        this.data = new HashMap<>();
        this.data.put(name, t);
    }

    public Map<String, T> getData() {
        return data;
    }
}