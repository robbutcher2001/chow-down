-- Extensions: uuid

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: public.units

CREATE TABLE public.units
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    singular text COLLATE pg_catalog."default" NOT NULL,
    plural text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT units_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.units
    OWNER to admin;

-- Table: public.ingredients

CREATE TABLE public.ingredients
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    ingredient text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT ingredients_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.ingredients
    OWNER to admin;

-- Table: public.recipes

CREATE TABLE public.recipes
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    rating smallint,
    url text COLLATE pg_catalog."default",
    image text COLLATE pg_catalog."default",
    CONSTRAINT recipes_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.recipes
    OWNER to admin;

-- Table: public.recipe_ingredients

CREATE TABLE public.recipe_ingredients
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    quantity double precision NOT NULL,
    unit_id uuid,
    ingredient_id uuid NOT NULL,
    recipe_id uuid,
    CONSTRAINT recipe_ingredients_pkey PRIMARY KEY (id),
    CONSTRAINT ingredient_id FOREIGN KEY (ingredient_id)
        REFERENCES public.ingredients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT unit_id FOREIGN KEY (unit_id)
        REFERENCES public.units (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.recipe_ingredients
    OWNER to admin;

-- Table: public.weeks

CREATE TABLE public.weeks
(
    date date NOT NULL,
    recipe_id uuid,
    CONSTRAINT date PRIMARY KEY (date),
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.weeks
    OWNER to admin;