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