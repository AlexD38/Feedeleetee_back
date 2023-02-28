-- cette fonction véririfie si un rdv n'a pas déjà été pris par un client avant d'y insérer un client.

DROP function UPDATE_APPOINTMENT;

CREATE OR REPLACE FUNCTION UPDATE_APPOINTMENT(CLIENTID 
INTEGER, APPOINTMENTID INTEGER) RETURNS VOID AS $$ 
	BEGIN
	UPDATE appointments
	SET client_id = clientid
	WHERE
	    appointments.client_id = clientId
	    AND appointments.id = appointmentId
	    AND appointments.client_id IS NULL;
	END;
	$$ LANGUAGE 
PLPGSQL; 