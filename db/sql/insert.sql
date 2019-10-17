CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO ingredients VALUES (DEFAULT, 'tomatoes');

INSERT INTO "recipe-ingredients" (id, quantity, recipe_id, ingredient_id) VALUES
    (DEFAULT, 2, (SELECT id from recipes WHERE title='Spag bol'), (SELECT id from ingredients WHERE ingredient='tomatoes'));

INSERT INTO test."recipe-ingredients" (id, quantity, unit_id, ingredient_id, recipe_id) VALUES
    (DEFAULT, 2, '671f1069-3273-4987-8645-1ca67f61eec9', 'a942e2f2-8f27-472c-a18c-6d10c3fd03d5', 'ad0ec178-d185-4211-9c35-4730ac4cf308');

INSERT INTO test.recipes (id, title, url, description) VALUES
    (DEFAULT, 'title', 'url', 'desc');

INSERT INTO test.weeks(
	date, recipe_id)
	VALUES ('2019-08-02', 'ad0ec178-d185-4211-9c35-4730ac4cf308');