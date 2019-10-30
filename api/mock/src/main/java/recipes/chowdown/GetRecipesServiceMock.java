package recipes.chowdown;

import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import recipes.chowdown.schema.ApiApi;
import recipes.chowdown.schema.Recipe;

@RestController
public class GetRecipesServiceMock implements ApiApi {

    @Override
    public ResponseEntity<List<Recipe>> apiRecipesGet() {
        Recipe r = new Recipe();
        r.setTitle("fake thing");
        return new ResponseEntity<List<Recipe>>(Collections.singletonList(r), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> apiRecipesPost(@Valid Recipe body) {
        // TODO Auto-generated method stub
        return null;
    }
    
}