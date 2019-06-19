CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO ingredients VALUES (DEFAULT, 'tomatoes');

INSERT INTO "recipe-ingredients" (id, quantity, recipe_id, ingredient_id) VALUES
    (DEFAULT, 2, (SELECT id from recipes WHERE title='Spag bol'), (SELECT id from ingredients WHERE ingredient='tomatoes'));