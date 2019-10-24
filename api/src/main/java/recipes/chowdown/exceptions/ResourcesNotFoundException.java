package recipes.chowdown.exceptions;

public class ResourcesNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public ResourcesNotFoundException(final String message) {
        super("ResourcesNotFoundException: " + message);
    }
}