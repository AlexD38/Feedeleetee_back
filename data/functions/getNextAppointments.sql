-- cette fonction retourne les 3 prpochains rdv de l'entreprise qui fait la requête.

DROP FUNCTION get_next_3_appointments;

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

--SELECT * from get_next_3_appointments(1);