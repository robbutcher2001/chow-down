-- Extensions: uuid

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User: chow_create_only

CREATE USER chow_create_only WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;

-- User: chow_read_only

CREATE USER chow_read_only WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;

-- User: chow_update_only

CREATE USER chow_update_only WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;

-- User: chow_delete_only

CREATE USER chow_delete_only WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;

GRANT CONNECT on DATABASE chowdown to chow_create_only;
GRANT CONNECT on DATABASE chowdown to chow_read_only;
GRANT CONNECT on DATABASE chowdown to chow_update_only;
GRANT CONNECT on DATABASE chowdown to chow_delete_only;

-- Run these to set a password
-- ALTER USER chow_create_only WITH PASSWORD '__PLACEHOLDER__';
-- ALTER USER chow_read_only WITH PASSWORD '__PLACEHOLDER__';
-- ALTER USER chow_update_only WITH PASSWORD '__PLACEHOLDER__';
-- ALTER USER chow_delete_only WITH PASSWORD '__PLACEHOLDER__';

-- SCHEMA: chow

CREATE SCHEMA chow;
ALTER SCHEMA chow OWNER to chow_admin;

GRANT USAGE ON SCHEMA chow TO chow_create_only;
GRANT USAGE ON SCHEMA chow TO chow_read_only;
GRANT USAGE ON SCHEMA chow TO chow_update_only;
GRANT USAGE ON SCHEMA chow TO chow_delete_only;
GRANT ALL ON SCHEMA chow TO chow_admin;

REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON DATABASE chowdown FROM PUBLIC;

-- Table: chow.units

CREATE TABLE chow.units
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

ALTER TABLE chow.units OWNER to chow_admin;

GRANT ALL ON TABLE chow.units to chow_admin;
GRANT SELECT, INSERT ON TABLE chow.units to chow_create_only;
GRANT SELECT ON TABLE chow.units to chow_read_only;
GRANT SELECT, UPDATE ON TABLE chow.units to chow_update_only;
GRANT SELECT, DELETE ON TABLE chow.units to chow_delete_only;

-- Table: chow.ingredients

CREATE TABLE chow.ingredients
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    ingredient text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT ingredients_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE chow.ingredients OWNER to chow_admin;

GRANT ALL ON TABLE chow.ingredients to chow_admin;
GRANT SELECT, INSERT ON TABLE chow.ingredients to chow_create_only;
GRANT SELECT ON TABLE chow.ingredients to chow_read_only;
GRANT SELECT, UPDATE ON TABLE chow.ingredients to chow_update_only;
GRANT SELECT, DELETE ON TABLE chow.ingredients to chow_delete_only;

-- Table: chow.recipes

CREATE TABLE chow.recipes
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    rating smallint,
    url text COLLATE pg_catalog."default",
    image text COLLATE pg_catalog."default",
    created_date timestamp with time zone NOT NULL,
    CONSTRAINT recipes_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE chow.recipes OWNER to chow_admin;

GRANT ALL ON TABLE chow.recipes to chow_admin;
GRANT SELECT, INSERT ON TABLE chow.recipes to chow_create_only;
GRANT SELECT ON TABLE chow.recipes to chow_read_only;
GRANT SELECT, UPDATE ON TABLE chow.recipes to chow_update_only;
GRANT SELECT, DELETE ON TABLE chow.recipes to chow_delete_only;

-- Table: chow.recipe_ingredients

CREATE TABLE chow.recipe_ingredients
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    quantity double precision NOT NULL,
    unit_id uuid NOT NULL,
    ingredient_id uuid NOT NULL,
    recipe_id uuid NOT NULL,
    CONSTRAINT recipe_ingredients_pkey PRIMARY KEY (id),
    CONSTRAINT ingredient_id FOREIGN KEY (ingredient_id)
        REFERENCES chow.ingredients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT unit_id FOREIGN KEY (unit_id)
        REFERENCES chow.units (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES chow.recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE chow.recipe_ingredients OWNER to chow_admin;

GRANT ALL ON TABLE chow.recipe_ingredients to chow_admin;
GRANT SELECT, INSERT ON TABLE chow.recipe_ingredients to chow_create_only;
GRANT SELECT ON TABLE chow.recipe_ingredients to chow_read_only;
GRANT SELECT, UPDATE ON TABLE chow.recipe_ingredients to chow_update_only;
GRANT SELECT, DELETE ON TABLE chow.recipe_ingredients to chow_delete_only;

-- Table: chow.days

CREATE TABLE chow.days
(
    date date NOT NULL,
    recipe_id uuid,
    CONSTRAINT date PRIMARY KEY (date),
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES chow.recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE chow.days OWNER to chow_admin;

GRANT ALL ON TABLE chow.days to chow_admin;
GRANT SELECT, INSERT, UPDATE ON TABLE chow.days to chow_create_only;
GRANT SELECT ON TABLE chow.days to chow_read_only;
GRANT SELECT, UPDATE ON TABLE chow.days to chow_update_only;
GRANT SELECT, DELETE ON TABLE chow.days to chow_delete_only;

-- Table: chow.tags

CREATE TABLE chow.tags
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text COLLATE pg_catalog."default" NOT NULL,
    background_colour text COLLATE pg_catalog."default" NOT NULL,
    text_colour text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tags_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE chow.tags OWNER to chow_admin;

GRANT ALL ON TABLE chow.tags to chow_admin;
GRANT SELECT, INSERT ON TABLE chow.tags to chow_create_only;
GRANT SELECT ON TABLE chow.tags to chow_read_only;
GRANT SELECT, UPDATE ON TABLE chow.tags to chow_update_only;
GRANT SELECT, DELETE ON TABLE chow.tags to chow_delete_only;

-- Table: chow.recipe_tags

CREATE TABLE chow.recipe_tags
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    tag_id uuid NOT NULL,
    recipe_id uuid NOT NULL,
    CONSTRAINT recipe_tags_pkey PRIMARY KEY (id),
    CONSTRAINT tag_id FOREIGN KEY (tag_id)
        REFERENCES chow.tags (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES chow.recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE chow.recipe_tags OWNER to chow_admin;

GRANT ALL ON TABLE chow.recipe_tags to chow_admin;
GRANT SELECT, INSERT ON TABLE chow.recipe_tags to chow_create_only;
GRANT SELECT ON TABLE chow.recipe_tags to chow_read_only;
GRANT SELECT, INSERT, DELETE ON TABLE chow.recipe_tags to chow_update_only;
GRANT SELECT, DELETE ON TABLE chow.recipe_tags to chow_delete_only;