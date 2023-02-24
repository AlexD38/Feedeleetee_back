BEGIN;

-- Enterprise gets all infos

CREATE OR REPLACE VIEW ENTERPRISE_INFOS 
	AS
	SELECT
	    enterprises.name AS name_of_enterprise,
	    enterprises.logo AS my_logo,
	    enterprises.description AS description_of_enterprise,
	    appointments.day,
	    appointments.time_of_day,
	    appointments.length_of_appointment AS duration,
	    appointments.payment_method AS paid_with,
	    clients.firstname AS firstname,
	    clients.lastname AS lastname,
	    clients.mail client_mail,
	    clients.tel client_tel,
	    services.name AS service,
	    services.price AS service_price,
	    services.description AS service_description,
	    offers.discount AS discount,
	    offers.description AS offer_description,
	    offers.sales_before_offer AS sales_before_offer_is_applied
	FROM enterprises
	    JOIN appointments ON enterprise_id = enterprises.id
	    JOIN clients ON clients.enterprise_id = enterprises.id
	    JOIN offers ON offers.enterprise_id = enterprises.id
	    JOIN services ON services.enterprise_id = enterprises.id
	WHERE enterprises.id =
1; 

;

--Client gets all infos

COMMIT;