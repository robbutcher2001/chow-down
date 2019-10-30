package recipes.chowdown.exceptions;

public class ServerException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public ServerException(final String message, final Exception ex) {
        super("ServerException: " + message, ex);
    }
}