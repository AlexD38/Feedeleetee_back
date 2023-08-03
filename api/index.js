import app from "../index.js";
import { db } from "@vercel/postgres";

const client = await db.connect();
await client.sql`DROP TABLE
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
        "logo" BYTEA,
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
    IF NOT EXISTS "enterprises_got_clients" (
        "id" SERIAL PRIMARY KEY,
        "enterprises_id" INTEGER REFERENCES "enterprises"("id") ON DELETE CASCADE,
        "clients_id" INTEGER REFERENCES "clients"("id") ON DELETE CASCADE,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    IF NOT EXISTS "users" (
        "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "user_name" TEXT NOT NULL,
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
        "description" TEXT NOT NULL,
        "image" bytea,
        "price" INT NOT NULL,
        "duration" TEXT NOT NULL,
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
        "day" DATE NOT NULL,
        "time_of_day" TEXT NOT NULL,
        "payment_method" TEXT,
        "client_id" INTEGER REFERENCES "clients"("id") ON DELETE CASCADE,
        "service_id" INTEGER REFERENCES "services"("id") ON DELETE CASCADE,
        "offer_id" INTEGER REFERENCES "offers"("id") ON DELETE CASCADE,
        "enterprise_id" INTEGER REFERENCES "enterprises"("id") ON DELETE CASCADE NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
    );
    
INSERT INTO
    enterprises (name, address, description)
VALUES (
        'Nails',
        '9 Avenue du prout',
        'Je fais des ongles !'
    );



INSERT INTO
    users (
        user_name,
        mail,
        password,
        enterprise_id
    )
VALUES (
        'Eli',
        'vada@gmail.com',
        'vada38!',
        1
    );


INSERT INTO
    clients (
        firstname,
        lastname,
        mail,
        tel,
        offer_is_available
    )
VALUES (
        'John',
        'Doe',
        'john.doe@example.com',
        '55626687',
        false
    ), (
        'Jane',
        'Doe',
        'jane.doe@example.com',
        '55555555',
        false
    ), (
        'Sophie',
        'afdde',
        'jim.smith@example.com',
        '7622156',
        false
    ), (
        'Jim',
        'gshggfhgfh',
        'jim.dfqdsfds@example.com',
        '34533453',
        false
    ), (
        'Pedro',
        'rthtyjn',
        'ped.fd@example.com',
        '35435',
        false
    ), (
        'Pascol',
        'mlohghf',
        'pasc.mol@example.com',
        '3545353',
        false
    ), (
        'fino',
        'atrez',
        'fino.dd@example.com',
        '12332',
        false
    ), (
        'Prout',
        'azerty',
        'prout.cul@example.com',
        '789',
        false
    ), (
        'Morris',
        'poiu',
        'mor.puio@example.com',
        '6456',
        false
    ), (
        'HAlbertine',
        'moke',
        'ha.mo@example.com',
        '654321',
        false
    );


INSERT INTO
    services (
        description,
        price,
        duration,
        enterprise_id
    )
VALUES (
        'je pose tous les ongles, dépose comprise',
        100,
        '3h',
        1
    ), (
        'je pose tous les ongles d''une main',
        50,
        '2h',
        1
    ), (
        'je pose un ongle',
        25,
        '1h30',
        1
    );

INSERT INTO
    appointments (
        day,
        time_of_day,
        service_id,
        enterprise_id
    )
VALUES ('01/09/2023', '9h', 1, 1), ('02/12/2023', '10h', 2, 1), ('12/08/2023', '11h', 3, 1), ('11/11/2023', '12h', 1, 1), ('08/02/2023', '13h', 2, 1), ('09/05/2023', '14h', 1, 1), ('09/04/2023', '15h', 3, 1);


INSERT INTO
    offers (
        sales_before_offer,
        description,
        -- FRANCAIS ??
        discount,
        enterprise_id
    )
VALUES (
        3,
        '-10% tous les 3 rdv',
        '10',
        1
    ), (
        5,
        '-50% tous les 5 rdv',
        '50',
        1
    ), (0, 'rdv gratuit', '100', 1);

INSERT INTO
    enterprises_got_clients (enterprises_id, clients_id)
VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5);

DROP FUNCTION IF EXISTS public.get_quick_view1 CASCADE;

CREATE OR REPLACE FUNCTION GET_QUICK_VIEW1(USERID INTEGER
, ENTERPRISEID INTEGER) RETURNS TABLE(USERNAME TEXT
, ENTREPRISE TEXT, SERVICES TEXT[], NUMBER_OF_SERVICES 
BIGINT, DATES_RDV DATE[], NUMBER_OF_RDV BIGINT, OFFERS 
TEXT[], NUMBER_OF_OFFERS BIGINT, CLIENTS TEXT[], NUMBER_OF_CLIENTS 
BIGINT) AS $$ 
	BEGIN RETURN QUERY
	SELECT
	    DISTINCT u.user_name as username,
	    e.name as entreprise,
	    COALESCE (
	        array_agg(DISTINCT s.description),
	        NULL
	    ) AS services,
	    count(DISTINCT s.id) AS number_of_services,
	    COALESCE(
	        array_agg(DISTINCT a.day),
	        NULL
	    ) AS dates_rdv,
	    count(DISTINCT a.id) as number_of_rdv,
	    COALESCE(
	        array_agg(DISTINCT o.description),
	        NULL
	    ) as offers,
	    count(DISTINCT o.id) as number_of_offers,
	    COALESCE(
	        array_agg(DISTINCT c.firstname),
	        NULL
	    ) as clients,
	    COALESCE(
	        count(DISTINCT egc.clients_id),
	        NULL
	    ) as number_of_clients
	FROM users u
	    JOIN enterprises e ON u.enterprise_id = e.id
	    LEFT JOIN appointments a ON a.enterprise_id = e.id
	    LEFT JOIN services s ON s.enterprise_id = e.id
	    LEFT JOIN offers o ON o.enterprise_id = e.id
	    LEFT JOIN enterprises_got_clients egc ON egc.enterprises_id = e.id
	    LEFT JOIN clients c ON egc.clients_id = c.id
	WHERE
	    u.id = userid
	    AND e.id = enterpriseid
	GROUP BY u.user_name, e.name;
	END;
	$$ LANGUAGE 
PLPGSQL; 



CREATE OR REPLACE FUNCTION GET_NEXT_3_APPOINTMENTS(
ENTERPRISEID INTEGER) RETURNS TABLE(ID INTEGER, DAY 
TEXT, HOUR TEXT) AS $$ 
	BEGIN RETURN QUERY
	SELECT
	    appointments.id,
	    to_char(
	        appointments.day,
	        'DD MM YYYY'
	    ) as day_formatted,
	    appointments.time_of_day as time
	FROM appointments
	    JOIN enterprises e ON appointments.enterprise_id = e.id
	WHERE
	    appointments.day >= CURRENT_DATE
	    AND e.id = enterpriseid
	GROUP BY
	    appointments.id,
	    e.id,
	    e.name
	LIMIT 3;
	END;
	$$ LANGUAGE 
PLPGSQL; 
`;
const allowCors = (fn) => async (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

app.use(allowCors);

export default [allowCors, app];
