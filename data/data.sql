BEGIN;

INSERT INTO clients (firstname, lastname, mail, tel, offer_is_available)
VALUES ('John', 'Doe', 'john.doe@example.com', '55626687', false),
       ('Jane', 'Doe', 'jane.doe@example.com', '55555555', false),
       ('Jim', 'Smith', 'jim.smith@example.com', '7622156', false);
COMMIT;