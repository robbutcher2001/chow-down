package rob;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ApigResponse {
    private final int statusCode;
    private final Map<String, String> headers;
    private final String body;
    private final boolean isBase64Encoded;

    public ApigResponse(final int statusCode, final String body) {
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

    public String getBody() {
        return this.body;
    }

    public boolean isBase64Encoded() {
        return this.isBase64Encoded;
    }
}