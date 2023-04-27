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