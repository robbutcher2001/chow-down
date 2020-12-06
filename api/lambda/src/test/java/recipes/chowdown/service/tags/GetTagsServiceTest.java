package recipes.chowdown.service.tags;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Arrays;
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

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class GetTagsServiceTest {

  @Mock
  private Context context;

  @Mock
  private LambdaLogger logger;

  @Mock
  private TagRepository repository;

  @InjectMocks
  private GetTagsService service;

  @BeforeAll
  void beforeAll() {
    MockitoAnnotations.initMocks(this);

    this.service = new GetTagsService();
  }

  // @Test
  void handleRequest_shouldReturnTag_whenExistsSingle() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Tag> returnedTags = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedTags.size());
  }

  // @Test
  void handleRequest_shouldReturnTags_whenExistsMultiple() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField);
    List<List<Field>> rows = Arrays.asList(columns, columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Tag> returnedTags = this.service.handleRequest(new Object(), this.context);

    assertEquals(2, returnedTags.size());
  }

  // @Test
  void handleRequest_shouldNotReturnTags_whenNoTagsExist() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(Collections.emptyList());

    List<Tag> returnedTags = this.service.handleRequest(new Object(), this.context);

    assertEquals(0, returnedTags.size());
  }

  // @Test
  void handleRequest_shouldThrowException_whenTooFewRowsReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);

    // only return one column (id) and no other tag fields
    List<Field> columns = Collections.singletonList(mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    assertThrows(ServerException.class, () -> this.service.handleRequest(new Object(), this.context));
  }

  // @Test
  void handleRequest_shouldReturnTag_whenTooManyRowsReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);

    // return four columns (too many for query)
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField, mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Tag> returnedTags = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedTags.size());
    assertEquals("fake", returnedTags.get(0).getId());
    assertEquals("fake", returnedTags.get(0).getName());
    assertEquals("fake", returnedTags.get(0).getColours().getBackground());
    assertEquals("fake", returnedTags.get(0).getColours().getText());
  }

  // @Test
  void handleRequest_shouldReturnTag_whenNoRowDataReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("");

    List<Tag> returnedTags = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedTags.size());
    assertEquals("", returnedTags.get(0).getId());
    assertEquals("", returnedTags.get(0).getName());
    assertEquals("", returnedTags.get(0).getColours().getBackground());
    assertEquals("", returnedTags.get(0).getColours().getText());
  }

  // @Test
  void handleRequest_shouldReturnTag_whenNullReturnedFromDb() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn(null);

    List<Tag> returnedTags = this.service.handleRequest(new Object(), this.context);

    assertEquals(1, returnedTags.size());
    assertNull(returnedTags.get(0).getId());
    assertNull(returnedTags.get(0).getName());
    assertNull(returnedTags.get(0).getColours().getBackground());
    assertNull(returnedTags.get(0).getColours().getText());
  }

  // @Test
  void handleRequest_shouldThrowException_whenCannotCommunicateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenThrow(BadRequestException.class);

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(new Object(), this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
  }

  // @Test
  void handleRequest_shouldThrowException_whenCannotAuthenticateWithDb() throws Exception {
    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenThrow(new AWSRDSDataException(
        "arn:aws:ACCOUNT_NUMBER/role is not authorized to perform: <action> on resource: arn:aws:ACCOUNT_NUMBER/resource"));

    ServerException returnedException = assertThrows(ServerException.class,
        () -> this.service.handleRequest(new Object(), this.context));
    assertTrue(returnedException.getMessage().contains("unable to complete request"));
    assertFalse(returnedException.getMessage().contains("ACCOUNT_NUMBER"));
    assertFalse(returnedException.getMessage().contains("is not authorized to perform"));
  }

  // @Test
  void handleRequest_shouldReturnTag_whenNullInputObject() throws Exception {
    ExecuteStatementResult mockResult = Mockito.mock(ExecuteStatementResult.class);
    Field mockField = Mockito.mock(Field.class);
    List<Field> columns = Arrays.asList(mockField, mockField, mockField, mockField);
    List<List<Field>> rows = Collections.singletonList(columns);

    when(this.context.getLogger()).thenReturn(this.logger);
    when(this.repository.getTags()).thenReturn(mockResult);
    when(mockResult.getRecords()).thenReturn(rows);
    when(mockField.getStringValue()).thenReturn("fake");

    List<Tag> returnedTags = this.service.handleRequest(null, this.context);

    assertEquals(1, returnedTags.size());
  }

  @Test
  void handleRequest_shouldThrowException_whenNullContext() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(new Object(), null));
  }

  @Test
  void handleRequest_shouldThrowException_whenAllNullInput() throws Exception {
    assertThrows(ServerException.class, () -> this.service.handleRequest(null, null));
  }
}