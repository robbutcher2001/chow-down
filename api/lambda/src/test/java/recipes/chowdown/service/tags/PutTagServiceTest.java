package recipes.chowdown.service.tags;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.rdsdata.model.AWSRDSDataException;
import com.amazonaws.services.rdsdata.model.BadRequestException;
import com.amazonaws.services.rdsdata.model.ExecuteStatementResult;
import com.amazonaws.services.rdsdata.model.Field;

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

import recipes.chowdown.domain.Tag;
import recipes.chowdown.exceptions.ServerException;
import recipes.chowdown.repository.TagRepository;
import recipes.chowdown.service.cache.CacheInvalidator;
import recipes.chowdown.service.cache.Endpoint;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class PutTagServiceTest {

  @Mock
  private Context context;

  @Mock
  private LambdaLogger logger;

  @Mock
  private TagRepository repository;

  @Mock
  private CacheInvalidator cacheInvalidator;

  @InjectMocks
  private PutTagService service;

  @BeforeAll
  void beforeAll() {
    MockitoAnnotations.initMocks(this);

    this.service = new PutTagService();
  }

  @Test
  void handleRequest_shouldReturnPopulatedTag_whenNewTagPut() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putTag(Mockito.any(Tag.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake_id");
    when(this.cacheInvalidator.invalidate(Mockito.any(Endpoint.class))).thenReturn("fake_invalidation");

    Tag returnedTag = this.service.handleRequest(new Tag(), this.context);

    assertEquals("fake_id", returnedTag.getId());
  }

  @Test
  void handleRequest_shouldThrowException_whenMultipleTagPut() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = new ArrayList<>();

    // Fake two rows returned
    rows.add(columns);
    rows.add(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putTag(Mockito.any(Tag.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Tag(), this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNoTagPut() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putTag(Mockito.any(Tag.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(Collections.emptyList());

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Tag(), this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNoIdReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putTag(Mockito.any(Tag.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("");

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Tag(), this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putTag(Mockito.any(Tag.class))).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn(null);

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Tag(), this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotCommunicateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putTag(Mockito.any(Tag.class))).thenThrow(BadRequestException.class);

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(new Tag(), this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
  }

  @Test
  void handleRequest_shouldThrowException_whenCannotAuthenticateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.putTag(Mockito.any(Tag.class))).thenThrow(new AWSRDSDataException(
        "arn:aws:ACCOUNT_NUMBER/role is not authorized to perform: <action> on resource: arn:aws:ACCOUNT_NUMBER/resource"));

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(new Tag(), this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
    assertFalse(returnedException.getMessage().contains("ACCOUNT_NUMBER"));
    assertFalse(returnedException.getMessage().contains("is not authorized to perform"));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullTagPut() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);

    assertThrows(ServerException.class, () -> this.service.handleRequest(null, this.context));
  }

  @Test
  void handleRequest_shouldThrowException_whenNullContext() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(new Tag(), null));
  }

  @Test
  void handleRequest_shouldThrowException_whenAllNullInput() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(null, null));
  }
}