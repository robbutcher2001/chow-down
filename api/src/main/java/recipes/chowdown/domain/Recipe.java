package recipes.chowdown.domain;

public class Recipe {
    private String id;
    private String title;
    private String updated;

    // public Recipe(String id, String title) {
    //     this.id = id;
    //     this.title = title;
    // }

    public String getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public String getUpdated() {
        return this.updated;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // @Override
    // public String toString() {
    //     return "Recipe [id=" + id + ", title=" + title + "]";
    // }
}