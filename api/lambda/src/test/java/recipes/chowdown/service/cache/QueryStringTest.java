package recipes.chowdown.service.cache;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class QueryStringTest {

  @Test
  void queryString_shouldReturnSingleQS_whenToStringCalledWithValidQS() {
    QueryString qs = new QueryString();
    qs.add("hello", "world");

    assertEquals("?hello=world", qs.toString());
  }

  @Test
  void queryString_shouldReturnMultipleQS_whenToStringCalledWithValidQS() {
    QueryString qs = new QueryString();
    qs.add("hello", "world");
    qs.add("hello1", "world1");
    qs.add("hello2", "world2");

    assertEquals("?hello=world&hello1=world1&hello2=world2", qs.toString());
  }

  @Test
  void queryString_shouldThrowException_whenToStringCalledWithInvalidKey() {
    QueryString qs = new QueryString();

    IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
        () -> qs.add("", "hello"));
    assertTrue(returnedException.getMessage().contains("key cannot be null or empty"));
  }

  @Test
  void queryString_shouldThrowException_whenToStringCalledWithInvalidValue() {
    QueryString qs = new QueryString();

    IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
        () -> qs.add("hello", ""));
    assertTrue(returnedException.getMessage().contains("value cannot be null or empty"));
  }

  @Test
  void queryString_shouldThrowException_whenToStringCalledWithNullKey() {
    QueryString qs = new QueryString();

    IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
        () -> qs.add(null, "hello"));
    assertTrue(returnedException.getMessage().contains("key cannot be null or empty"));
  }

  @Test
  void queryString_shouldThrowException_whenToStringCalledWithNullValue() {
    QueryString qs = new QueryString();

    IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
        () -> qs.add("hello", null));
    assertTrue(returnedException.getMessage().contains("value cannot be null or empty"));
  }
}