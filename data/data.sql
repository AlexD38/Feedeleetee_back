----------------------------------------------------------------

----------------------------------------------------------------

-------------------THIS IS THE SEEDING FILE---------------------

----------------------------------------------------------------

----------------------------------------------------------------

BEGIN;

----------------------------------------------------------------

---------------------ENTERPRISES TABLE SEEDING-----------------

----------------------------------------------------------------

INSERT INTO
    enterprises (name, address, description)
VALUES (
        'Nails',
        '9 Avenue du prout',
        'Je fais des ongles !'
    );

----------------------------------------------------------------

---------------------USERS TABLE SEEDING-----------------

----------------------------------------------------------------

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

----------------------------------------------------------------

-----------------------CLIENTS TABLE SEEDING--------------------

----------------------------------------------------------------

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

----------------------------------------------------------------

---------------------SERVICES TABLE SEEDING-----------------

----------------------------------------------------------------

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

----------------------------------------------------------------

---------------------APPOINTMENTS TABLE SEEDING-----------------

----------------------------------------------------------------

INSERT INTO
    appointments (
        day,
        time_of_day,
        service_id,
        enterprise_id
    )
VALUES ('01/09/2023', '9h', 1, 1), ('02/12/2023', '10h', 2, 1), ('12/08/2023', '11h', 3, 1), ('11/11/2023', '12h', 1, 1), ('08/02/2023', '13h', 2, 1), ('09/05/2023', '14h', 1, 1), ('09/04/2023', '15h', 3, 1);

----------------------------------------------------------------

---------------------OFFERS TABLE SEEDING-----------------

----------------------------------------------------------------

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

COMMIT;