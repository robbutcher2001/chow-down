package recipes.chowdown.exceptions;

public class ResourceNotPersistedException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public ResourceNotPersistedException(final String message) {
        super("ResourceNotPersistedException: " + message);
    }
}