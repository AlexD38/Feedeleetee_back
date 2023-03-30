BEGIN;

--DROP View quick_view;

CREATE OR REPLACE VIEW QUICK_VIEW 
	AS
	SELECT
	    DISTINCT users.user_name as username,
	    enterprises.name as entreprise,
	    array_agg(services.description) AS services,
	    count(DISTINCT services.id) AS number_of_services,
	    array_agg(DISTINCT appointments.day) AS dates_rdv,
	    count(DISTINCT appointments.id) as number_of_rdv,
	    array_agg(DISTINCT offers.description) as offers,
	    count(DISTINCT offers.id) as number_of_offers,
	    array_agg(DISTINCT clients.firstname) as clients,
	    count(
	        DISTINCT enterprises_got_clients.clients_id
	    ) as number_of_clients
	from users
	    JOIN enterprises on enterprise_id = enterprises.id
	    JOIN appointments on appointments.enterprise_id = enterprises.id
	    JOIN services on services.enterprise_id = enterprises.id
	    JOIN offers on offers.enterprise_id = enterprises.id
	    JOIN enterprises_got_clients on enterprises_got_clients.enterprises_id = enterprises.id
	    JOIN clients on enterprises_got_clients.clients_id = clients.id
	WHERE users.id = 1
	GROUP BY
	    users.user_name,
	    enterprises.name
; 

--SELECT * from QUICK_VIEW;

COMMIT;