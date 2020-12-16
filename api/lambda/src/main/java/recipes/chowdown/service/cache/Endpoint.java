package recipes.chowdown.service.cache;

public enum Endpoint {
  UNIT("/api/units"), INGREDIENT("/api/ingredients"), RECIPE("/api/recipes"), DAY("/api/days"), TAG("/api/tags");

  private final String endpoint;

  private Endpoint(String endpoint) {
    this.endpoint = endpoint;
  }

  public String getPath() {
    return this.endpoint.toString();
  }
}