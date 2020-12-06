package recipes.chowdown.service.tags;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

import recipes.chowdown.domain.Colour;
import recipes.chowdown.domain.Tag;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.TagRepository;

public class GetTagsService implements RequestHandler<Object, List<Tag>> {

  private static LambdaLogger LOGGER;

  private TagRepository repository;

  public GetTagsService() {
    this.repository = new TagRepository();
  }

  public List<Tag> handleRequest(final Object input, final Context context) {
    try {
      LOGGER = context.getLogger();

      // final List<Tag> tags = new ArrayList<>();

      // ExecuteStatementResult result = this.repository.getTags();

      // if (result.getRecords().size() < 1) {
      //   LOGGER.log("No tags found");
      // }

      // for (List<Field> fields : result.getRecords()) {
      //   tags.add(Tag.builder().id(fields.get(0).getStringValue()).name(fields.get(1).getStringValue()).colours(
      //       Colour.builder().background(fields.get(2).getStringValue()).text(fields.get(3).getStringValue()).build())
      //       .build());
      // }

      // DEPLOYED TEST
      // return tags;
      Tag tag0 = Tag.builder().id("123").name("Slimming world").colours(Colour.builder().background("#d73a49").text("#fff").build()).build();
      Tag tag1 = Tag.builder().id("456").name("Chicken").colours(Colour.builder().background("#009688").text("#fff").build()).build();
      Tag tag2 = Tag.builder().id("789").name("Beef").colours(Colour.builder().background("#ca4a6c").text("#fff").build()).build();
      Tag tag3 = Tag.builder().id("abc").name("Vegetables").colours(Colour.builder().background("#005ea5").text("#fff").build()).build();
      Tag tag4 = Tag.builder().id("def").name("Under 20 mins").colours(Colour.builder().background("#6f42c1").text("#fff").build()).build();
      Tag tag5 = Tag.builder().id("ghi").name("Quick meals").colours(Colour.builder().background("#d73a49").text("#fff").build()).build();
      List<Tag> fakeTags = new ArrayList<>();
      fakeTags.add(tag0);
      fakeTags.add(tag1);
      fakeTags.add(tag2);
      fakeTags.add(tag3);
      fakeTags.add(tag4);
      fakeTags.add(tag5);
      return fakeTags;
      // END DEPLOYED TEST
    } catch (AmazonServiceException ase) {
      LOGGER.log(ase.getMessage());
      throw new ServerException("unable to complete request");
    } catch (Exception ex) {
      throw new ServerException(ex.getMessage(), ex);
    }
  }
}