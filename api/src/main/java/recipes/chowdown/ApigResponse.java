package recipes.chowdown;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ApigResponse {
    private final int statusCode;
    private final Map<String, String> headers;
    private final Object body;
    private final boolean isBase64Encoded;

    public ApigResponse(final int statusCode, final Object body) {
        this.statusCode = statusCode;
        this.body = body;

        this.headers = new HashMap<>();
        this.headers.put("Content-Type", "application/json");
        this.isBase64Encoded = false;
    }

    public int getStatusCode() {
        return this.statusCode;
    }

    public Map<String, String> getHeaders() {
        return Collections.unmodifiableMap(this.headers);
    }

    public Object getBody() {
        return this.body;
    }

    public boolean isBase64Encoded() {
        return this.isBase64Encoded;
    }
}