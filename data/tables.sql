BEGIN;

DROP TABLE
    IF EXISTS "clients",
    "appointments",
    "offers",
    "services",
    "enterprises" CASCADE;

CREATE TABLE
    IF NOT EXISTS "enterprises" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL,
        "address" TEXT,
        "logo" TEXT,
        "description" TEXT,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    IF NOT EXISTS "clients" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "firstname" TEXT NOT NULL,
        "lastname" TEXT NOT NULL,
        "mail" TEXT NOT NULL,
        "tel" TEXT,
        "offer_is_available" BOOLEAN,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    IF NOT EXISTS "services" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "price" INT NOT NULL,
        "enterprise_id" INTEGER REFERENCES "enterprises"("id") ON DELETE CASCADE,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    IF NOT EXISTS "offers" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "sales_before_offer" INT,
        "description" TEXT NOT NULL,
        -- FRANCAIS ??
        "réduction" INT,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    IF NOT EXISTS "appointments" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "day" TEXT NOT NULL,
        "time_of_day" TEXT NOT NULL,
        "payment_method" TEXT,
        "client_id" INTEGER REFERENCES "clients"("id") ON DELETE CASCADE,
        "service_id" INTEGER REFERENCES "services"("id") ON DELETE CASCADE NOT NULL,
        "offer_id" INTEGER REFERENCES "offers"("id") ON DELETE CASCADE,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

COMMIT;