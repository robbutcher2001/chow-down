package recipes.chowdown.service.cache;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class QueryString {
  private List<QueryStringItem> queryStrings;

  public QueryString() {
    this.queryStrings = new ArrayList<>();
  }

  public void add(final String key, final String value) {
    if (key == null || key.isEmpty()) {
      throw new IllegalArgumentException("key cannot be null or empty");
    }
    if (value == null || value.isEmpty()) {
      throw new IllegalArgumentException("value cannot be null or empty");
    }

    this.queryStrings.add(new QueryStringItem(key, value));
  }

  @Override
  public String toString() {
    final StringBuilder sb = new StringBuilder("?");
    for (int index = 0; index < this.queryStrings.size(); index++) {
      String spacer = "&";
      if (index == this.queryStrings.size() - 1) {
        spacer = "";
      }
      sb.append(this.queryStrings.get(index).getKey() + "=" + this.queryStrings.get(index).getValue() + spacer);
    }
    return sb.toString();
  }

  @AllArgsConstructor
  @Getter
  private class QueryStringItem {
    private String key;
    private String value;
  }
}