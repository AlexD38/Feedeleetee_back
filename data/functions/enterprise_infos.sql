-- DROP FUNCTION get_enterprise_infos(INTEGER);

-- CREATE OR REPLACE FUNCTION PUBLIC.GET_ENTERPRISE_INFOS

-- (USER_ID INTEGER) RETURNS TABLE(NAME_OF_USER TEXT,

-- LASTNAME_OF_USER TEXT, NAME_OF_ENTERPRISE TEXT, MY_LOGO

-- TEXT, DESCRIPTION_OF_ENTERPRISE TEXT, DAY TEXT, TIME_OF_DAY

-- TEXT, DURATION TEXT, PAID_WITH TEXT, FIRSTNAME TEXT

-- , LASTNAME TEXT, CLIENT_MAIL TEXT, CLIENT_TEL TEXT

-- , SERVICE TEXT, SERVICE_PRICE INTEGER, SERVICE_DESCRIPTION

-- TEXT, DISCOUNT INTEGER, OFFER_DESCRIPTION TEXT, SALES_BEFORE_OFFER_IS_APPLIED

-- INTEGER) LANGUAGE PLPGSQL AS $FUNCTION$

-- 	BEGIN RETURN QUERY

-- 	SELECT

-- 	    users.first_name AS name_of_user,

-- 	    users.last_name AS lastname_of_user,

-- 	    enterprises.name AS name_of_enterprise,

-- 	    enterprises.logo AS my_logo,

-- 	    enterprises.description AS description_of_enterprise,

-- 	    appointments.day,

-- 	    appointments.time_of_day,

-- 	    appointments.length_of_appointment AS duration,

-- 	    appointments.payment_method AS paid_with,

-- 	    clients.firstname AS firstname,

-- 	    clients.lastname AS lastname,

-- 	    clients.mail client_mail,

-- 	    clients.tel client_tel,

-- 	    services.name AS service,

-- 	    services.price AS service_price,

-- 	    services.description AS service_description,

-- 	    offers.discount AS discount,

-- 	    offers.description AS offer_description,

-- 	    offers.sales_before_offer AS sales_before_offer_is_applied

-- 	FROM users

-- 	    JOIN enterprises ON users.enterprise_id = enterprises.id

-- 	    JOIN appointments ON appointments.enterprise_id = enterprises.id

-- 	    JOIN clients ON clients.enterprise_id = enterprises.id

-- 	    JOIN offers ON offers.enterprise_id = enterprises.id

-- 	    JOIN services ON services.enterprise_id = enterprises.id

-- 	WHERE users.id = 1;

-- 	END;

-- 	$FUNCTION$

-- ;