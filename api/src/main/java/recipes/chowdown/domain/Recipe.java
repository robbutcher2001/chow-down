package recipes.chowdown.domain;

public class Recipe {
    private String id;
    private String title;

    public Recipe() {
        this.id = "";
        this.title = "";
    }

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