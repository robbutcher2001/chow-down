--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: chow; Owner: chow-admin
--

INSERT INTO chow.ingredients (id, name) VALUES ('ba3f3324-ec8d-49d1-addb-f2d83f58b682', 'tomatoes');
INSERT INTO chow.ingredients (id, name) VALUES ('9eeb66a9-328b-4871-ad1a-92a014ea3230', 'mushrooms');
INSERT INTO chow.ingredients (id, name) VALUES ('78093c15-d3d7-4123-990f-a2cc332f16ed', 'peppers');
INSERT INTO chow.ingredients (id, name) VALUES ('d7ceb5ae-8dab-4a03-9cf3-4cc7661b6b1a', 'chicken');
INSERT INTO chow.ingredients (id, name) VALUES ('63c128cd-9c8c-4fef-a8ef-94bc6e5a26df', 'breadcrumbs');
INSERT INTO chow.ingredients (id, name) VALUES ('82081da4-28c5-413e-89c3-53df2a607f05', 'lettuce');
INSERT INTO chow.ingredients (id, name) VALUES ('529de86c-5e30-4592-84d8-e7cf123d9022', 'steak');
INSERT INTO chow.ingredients (id, name) VALUES ('c25bbf99-64d5-4973-a441-3ffe0260176f', 'noodles');
INSERT INTO chow.ingredients (id, name) VALUES ('110c66c6-d14a-4df5-9728-73bab88e5616', 'milk');
INSERT INTO chow.ingredients (id, name) VALUES ('20e88525-071d-4926-8b7c-ae0df67c3ffe', 'cheese');


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: chow; Owner: chow-admin
--

INSERT INTO chow.recipes (id, title, description, rating, url, image, created_date) VALUES ('972e7bbe-9bb6-40ed-8bfb-dc130153537d', 'Crispy chicken fajitas', 'This recipe is a stripped down chicken fajita with only a few ingredients. But put together and you have a wonderfully delicious meal that will satisfy your cravings. The crispy chicken strips are the star of the show with juicy tomatoes and crunchy lettuce providing supporting roles with lashings of sour cream and our tasty ‘Thick ‘n’ Chunky Salsa’ topping off this tasty cast. Get together with your family and friends and enjoy this simple but delicious crispy chicken fajita!', 4, 'https://www.oldelpaso.co.uk/mexican-recipes/crispy-chicken-fajitas', 'https://www.oldelpaso.co.uk/-/media/oep/uk/recipes/crispy-chicken-fajitas-hero.jpg', '2020-04-02T10:15:55+01:00');
INSERT INTO chow.recipes (id, title, description, rating, url, image, created_date) VALUES ('c2cc5863-1150-42a3-b4b3-06da2ac436fe', 'Slow cooker chicken curry', 'Try this easy, one-pot chicken curry thats low-fat, low-calorie and delivers three of your five-a-day. Its slow-cooked so the meat is beautifully tender', 5, 'https://www.bbcgoodfood.com/recipes/slow-cooker-chicken-curry', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/slow-cooker-chicken-curry.jpg', '2020-04-02T10:10:05+01:00');


--
-- Data for Name: units; Type: TABLE DATA; Schema: chow; Owner: chow-admin
--

INSERT INTO chow.units (id, singular, plural) VALUES ('060cd50d-5bec-4c0d-ab93-6e4efab7fecb', 'gram', 'grams');
INSERT INTO chow.units (id, singular, plural) VALUES ('cb9bcbeb-da4f-443d-b6ce-62ad04f0d2e6', 'ml', 'ml');
INSERT INTO chow.units (id, singular, plural) VALUES ('366c3108-90f0-4c3b-94b5-79b63d63268e', 'portion', 'portions');


--
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: chow; Owner: chow-admin
--

INSERT INTO chow.recipe_ingredients (id, quantity, unit_id, ingredient_id, recipe_id) VALUES ('d38ae5c4-efc3-4e9c-a324-b2542c084a2e', 2, '366c3108-90f0-4c3b-94b5-79b63d63268e', 'ba3f3324-ec8d-49d1-addb-f2d83f58b682', '972e7bbe-9bb6-40ed-8bfb-dc130153537d');
INSERT INTO chow.recipe_ingredients (id, quantity, unit_id, ingredient_id, recipe_id) VALUES ('1ae822aa-58e6-4b38-ae90-831729f6a9e5', 1, '366c3108-90f0-4c3b-94b5-79b63d63268e', '63c128cd-9c8c-4fef-a8ef-94bc6e5a26df', '972e7bbe-9bb6-40ed-8bfb-dc130153537d');
INSERT INTO chow.recipe_ingredients (id, quantity, unit_id, ingredient_id, recipe_id) VALUES ('438a5349-f6d0-42cd-8aa6-e8b8262530f4', 1, '366c3108-90f0-4c3b-94b5-79b63d63268e', '82081da4-28c5-413e-89c3-53df2a607f05', '972e7bbe-9bb6-40ed-8bfb-dc130153537d');
INSERT INTO chow.recipe_ingredients (id, quantity, unit_id, ingredient_id, recipe_id) VALUES ('a1a27214-4f0a-426a-beca-3ecfacaccab0', 500, '060cd50d-5bec-4c0d-ab93-6e4efab7fecb', 'd7ceb5ae-8dab-4a03-9cf3-4cc7661b6b1a', '972e7bbe-9bb6-40ed-8bfb-dc130153537d');

INSERT INTO chow.recipe_ingredients (id, quantity, unit_id, ingredient_id, recipe_id) VALUES ('a8e9dd38-e4b2-42ee-8843-1e02c403306c', 750, 'cb9bcbeb-da4f-443d-b6ce-62ad04f0d2e6', '110c66c6-d14a-4df5-9728-73bab88e5616', 'c2cc5863-1150-42a3-b4b3-06da2ac436fe');
INSERT INTO chow.recipe_ingredients (id, quantity, unit_id, ingredient_id, recipe_id) VALUES ('a07b0933-2794-4e27-8719-602b7b0ae4ff', 2, '366c3108-90f0-4c3b-94b5-79b63d63268e', '78093c15-d3d7-4123-990f-a2cc332f16ed', 'c2cc5863-1150-42a3-b4b3-06da2ac436fe');
INSERT INTO chow.recipe_ingredients (id, quantity, unit_id, ingredient_id, recipe_id) VALUES ('61424700-9b51-4139-9f25-e35115320eff', 250, '060cd50d-5bec-4c0d-ab93-6e4efab7fecb', 'd7ceb5ae-8dab-4a03-9cf3-4cc7661b6b1a', 'c2cc5863-1150-42a3-b4b3-06da2ac436fe');