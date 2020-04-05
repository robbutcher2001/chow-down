SELECT  recipes.id, 
        recipes.title, ingredients.ingredient
FROM    recipes   
        LEFT JOIN ingredients 
            ON employee.id = training.department_id AND
                training.class LIKE '%SECURITY%'
ORDER   BY employee.id

-- All three work but just using JOINS is better for performance
SELECT ri.quantity,i.ingredient
FROM ingredients i
INNER JOIN "recipe-ingredients" ri
    ON ri.ingredient_id = i.id
WHERE ri.recipe_id IN (
	SELECT r.id
	FROM recipes r
	WHERE r.title = 'Spag bol'
);

SELECT ri.quantity, i.ingredient
FROM "recipe-ingredients" ri
INNER JOIN recipes r
    ON ri.recipe_id = r.id
INNER JOIN ingredients i
    ON ri.ingredient_id = i.id
INNER JOIN units u
    ON ri.unit_id = u.id
WHERE r.title = 'Spag bol';

-- best?
SELECT ri.quantity, u.unit, i.ingredient
FROM "recipe-ingredients" ri
INNER JOIN recipes r
	ON ri.recipe_id = r.id
	AND ri.recipe_id = '972e7bbe-9bb6-40ed-8bfb-dc130153537d'
INNER JOIN ingredients i
    ON ri.ingredient_id = i.id
INNER JOIN units u
    ON ri.unit_id = u.id;

-- All ingredients associated with a recipe:
SELECT *
FROM "recipe-ingredients" ri
INNER JOIN recipes r
    ON ri.recipe_id = r.id;

-- Recipe chosen for a specific day:
SELECT r.id, w.date, r.title, r.description, r.rating, r.image
FROM recipes r
INNER JOIN days d
	ON w.recipe_id = r.id
	AND w.date = '2019-10-17';

SELECT date_trunc('day', now()) - interval '7 days';

SELECT r.id, w.date, r.title, r.description, r.rating, r.image
FROM recipes r
INNER JOIN days d
	ON w.recipe_id = r.id
	AND w.date BETWEEN '2015-01-01' AND date_trunc('day', now());

-- Foreign key contraints: http://www.postgresqltutorial.com/postgresql-foreign-key/








SELECT d.date, r.title, r.rating, r.image, ri.quantity, u.singular, u.plural, i.ingredient
FROM chow.recipe_ingredients ri
INNER JOIN chow.units u
  ON u.id = ri.unit_id
INNER JOIN chow.ingredients i
  ON i.id = ri.ingredient_id
INNER JOIN chow.recipes r
  ON r.id = ri.recipe_id
INNER JOIN chow.days d
  ON d.recipe_id = r.id
  AND d.date BETWEEN '2020-04-01' AND '2020-04-05'
ORDER BY d.date, i.ingredient;