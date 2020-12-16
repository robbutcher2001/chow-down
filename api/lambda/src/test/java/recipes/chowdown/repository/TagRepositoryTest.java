package recipes.chowdown.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import com.amazonaws.services.rdsdata.AWSRDSData;
import com.amazonaws.services.rdsdata.model.ExecuteStatementRequest;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import recipes.chowdown.domain.Colour;
import recipes.chowdown.domain.Tag;
import recipes.chowdown.exceptions.ResourceNotPersistedException;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class TagRepositoryTest {

  @Mock
  private AWSRDSData rdsData;

  @InjectMocks
  private TagRepository repository;

  @BeforeAll
  void beforeAll() {
    MockitoAnnotations.initMocks(this);

    this.repository = new TagRepository();
  }

  @Test
  void getTags_shouldReturnResults_whenRequestValid() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

    ExecuteStatementResult result = this.repository.getTags();

    assertEquals(mockResult, result);
  }

  @Test
  void getTags_shouldNotReturnResults_whenRequestInvalid() throws Exception {
    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(null);

    ExecuteStatementResult result = this.repository.getTags();

    assertNull(result);
  }

  @Test
  void putTag_shouldReturnResults_whenRequestValidTag() throws Exception {
    Tag tag = Tag.builder().name("Chicken").colours(Colour.builder().background("red").text("white").build()).build();
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.rdsData.executeStatement(Mockito.any(ExecuteStatementRequest.class))).thenReturn(mockResult);

    ExecuteStatementResult result = this.repository.putTag(tag);

    assertEquals(mockResult, result);
  }

  @Test
  void putTag_shouldReturnResults_whenRequestInvalidTag() throws Exception {
    Tag tag = Tag.builder().build();

    ResourceNotPersistedException returnedException = assertThrows(ResourceNotPersistedException.class,
        () -> this.repository.putTag(tag));

    assertTrue(returnedException.getMessage().contains("part or all of the input Tag was null"));
  }

  @Test
  void putTag_shouldThrowException_whenRequestNullTag() throws Exception {
    ResourceNotPersistedException returnedException = assertThrows(ResourceNotPersistedException.class,
        () -> this.repository.putTag(null));
    assertTrue(returnedException.getMessage().contains("part or all of the input Tag was null"));
  }
}