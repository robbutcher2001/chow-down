package recipes.chowdown.domain;

public class Recipe {
    private final String id;
    private final String title;

    public Recipe(String id, String title) {
        this.id = id;
        this.title = title;
    }

    public String getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }
}