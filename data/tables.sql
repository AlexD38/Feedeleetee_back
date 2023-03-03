BEGIN;

DROP TABLE
    IF EXISTS "clients",
    "appointments",
    "offers",
    "services",
    "users",
    "enterprises",
    "enterprises_got_clients" CASCADE;

CREATE TABLE
    IF NOT EXISTS "enterprises" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL UNIQUE,
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
        "enterprise_id" INTEGER REFERENCES "enterprises"("id") ON DELETE CASCADE,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    IF NOT EXISTS "enterprises_got_clients" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "enterprises_id" INTEGER REFERENCES "enterprises"("id") ON DELETE CASCADE,
        "clients_id" INTEGER REFERENCES "clients"("id") ON DELETE CASCADE,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    IF NOT EXISTS "users" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "first_name" TEXT NOT NULL,
        "last_name" TEXT NOT NULL,
        "mail" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "client_id" INTEGER REFERENCES "clients"("id") ON DELETE CASCADE,
        "enterprise_id" INTEGER REFERENCES "enterprises"("id") ON DELETE CASCADE,
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
        "discount" INT,
        "enterprise_id" INTEGER REFERENCES "enterprises"("id") ON DELETE CASCADE,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    IF NOT EXISTS "appointments" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "day" TEXT NOT NULL,
        "time_of_day" TEXT NOT NULL,
        "length_of_appointment" TEXT NOT NULL,
        "payment_method" TEXT,
        "client_id" INTEGER REFERENCES "clients"("id") ON DELETE CASCADE,
        "service_id" INTEGER REFERENCES "services"("id") ON DELETE CASCADE NOT NULL,
        "offer_id" INTEGER REFERENCES "offers"("id") ON DELETE CASCADE,
        "enterprise_id" INTEGER REFERENCES "enterprises"("id") ON DELETE CASCADE NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

COMMIT;