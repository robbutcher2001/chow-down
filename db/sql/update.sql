UPDATE "recipe-ingredients"
	SET quantity = 7
WHERE ingredient_id IN (
	SELECT i.id
	FROM ingredients i
	WHERE i.ingredient = 'erbs');