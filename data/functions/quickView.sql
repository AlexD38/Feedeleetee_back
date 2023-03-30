--DROP FUNCTION get_quick_view;

CREATE OR REPLACE FUNCTION GET_QUICK_VIEW(ENTERPRISEID 
INTEGER) RETURNS TABLE(USERNAME TEXT, ENTREPRISE TEXT
, SERVICES TEXT[], NUMBER_OF_SERVICES BIGINT, DATES_RDV 
DATE[], NUMBER_OF_RDV BIGINT, OFFERS TEXT[], NUMBER_OF_OFFERS 
BIGINT, CLIENTS TEXT[], NUMBER_OF_CLIENTS BIGINT) 
AS $$ 
	BEGIN RETURN QUERY
	SELECT
	    DISTINCT u.user_name as username,
	    e.name as entreprise,
	    array_agg(DISTINCT s.description) AS services,
	    count(DISTINCT s.id) AS number_of_services,
	    array_agg(DISTINCT a.day) AS dates_rdv,
	    count(DISTINCT a.id) as number_of_rdv,
	    array_agg(DISTINCT o.description) as offers,
	    count(DISTINCT o.id) as number_of_offers,
	    array_agg(DISTINCT c.firstname) as clients,
	    count(DISTINCT egc.clients_id) as number_of_clients
	FROM users u
	    JOIN enterprises e ON u.enterprise_id = e.id
	    JOIN appointments a ON a.enterprise_id = e.id
	    JOIN services s ON s.enterprise_id = e.id
	    JOIN offers o ON o.enterprise_id = e.id
	    JOIN enterprises_got_clients egc ON egc.enterprises_id = e.id
	    JOIN clients c ON egc.clients_id = c.id
	WHERE
	    u.id = 1
	    AND e.id = enterpriseid
	GROUP BY u.user_name, e.name;
	END;
	$$ LANGUAGE 
PLPGSQL; 

--SELECT * FROM get_quick_view(1);