-- Table: public.units

CREATE TABLE public.units
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    unit text COLLATE pg_catalog."default" NOT NULL,
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
    url text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT recipes_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.recipes
    OWNER to admin;

-- Table: public."recipe-ingredients"

CREATE TABLE public."recipe-ingredients"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    quantity double precision NOT NULL,
    unit_id uuid NOT NULL,
    ingredient_id uuid NOT NULL,
    recipe_id uuid NOT NULL,
    CONSTRAINT "recipe-ingredients_pkey" PRIMARY KEY (id),
    CONSTRAINT unit_id FOREIGN KEY (unit_id)
        REFERENCES public.units (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ingredient_id FOREIGN KEY (ingredient_id)
        REFERENCES public.ingredients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."recipe-ingredients"
    OWNER to admin;