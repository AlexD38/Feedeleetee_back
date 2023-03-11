import client from "../database.js";

const get_model = {
	async getAllInfosForMyEnterprise(userId) {
		try {
			// à transformer en fonction
			// cette requête renvoie mon entreprise avec mes rdv qui ont des services attribués qui ont eux même des offres attribuees.
			// qui ont des clients atttribués.
			//! si ces condition ne sont pas remplies bah y a rien ...
			const sqlQuery = {
				text: `SELECT enterprises.name, address, logo,
				json_agg(json_build_object(
				  'day', day, 
				  'time_of_day', time_of_day, 
				  'appointments.service_id',appointments.service_id, 
				  'services.name', services.name, 
				  'services.description', COALESCE(services.description, ''), 
				  'services.price', services.price,
				  'clients.id', COALESCE(clients.id, 0), 
				  'clients.first_name', clients.firstname, 
				  'clients.last_name', clients.lastname, 
				  'clients.email', COALESCE(clients.mail, ''),
				  'clients.tel', COALESCE(clients.tel, '')
				)) AS appointments
			  FROM users
			  JOIN enterprises ON enterprise_id = enterprises.id
			  JOIN appointments ON appointments.enterprise_id = enterprises.id
			  JOIN clients ON appointments.client_id = clients.id
			  JOIN services ON services.enterprise_id = services.id
			  WHERE users.id = ($1)
			  GROUP BY enterprises.name, address, logo;
			  `,
				values: [userId],
			};
			const response = await client.query(sqlQuery);
			console.log(response.rows);
			// let data = response.rows;

			return response.rows;
		} catch (error) {
			// res.status(500);
			console.log(error);
		}
	},
	async getOneClient(clientId) {
		try {
			const sqlQuery = {
				text: `
            SELECT * FROM clients where clients.id = ($1);`,
				values: [clientId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (err) {
			console.error(err);
		}
	},
	async getOneClientAppointments(clientId) {
		try {
			const sqlQuery = {
				text: `
				SELECT json_build_object('appointments', json_agg(json_build_object('day', day, 'time', time_of_day, 'length', length_of_appointment)), 'firstname', firstname, 'lastname', lastname) AS client_appointments
				FROM clients 
				JOIN appointments ON client_id = clients.id 
				WHERE clients.id = $1 
				GROUP BY clients.id, firstname, lastname;`,
				values: [clientId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (err) {
			console.error(err);
		}
	},
	async getclientsFromEnterprise(enterpriseId) {
		try {
			const sqlQuery = {
				text: `
				SELECT firstname, lastname, mail, tel FROM enterprises_got_clients JOIN  clients ON clients_id=clients.id WHERE enterprises_id=($1);
`,
				values: [enterpriseId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (err) {
			console.error(err);
		}
	},
	async getEnterprises() {
		try {
			const sqlQuery = `SELECT * FROM enterprises;`;
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getOneEnterprise(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM enterprises WHERE id = ($1);`,
				values: [enterpriseId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getAppointmentsFromServices(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT json_build_object(
				'nom de l entreprise', enterprises.name,
				'services', (
				  SELECT json_agg(json_build_object(
									'nom du service', services.name, 
									'description', services.description, 
									'price', services.price,
									'appointments', (
									  SELECT json_agg(json_build_object(
														  'day', appointments.day,
														  'heure du rendez-vous', appointments.time_of_day,
														  'durée du rendez-vous', appointments.length_of_appointment
														))
									  FROM appointments
									  WHERE appointments.service_id = services.id
									)
								  ))
				  FROM services
				  WHERE services.enterprise_id = enterprises.id
				  GROUP BY enterprises.id
				)
			  ) AS entreprise_et_services
	   FROM enterprises
	   WHERE enterprises.id = ($1);
	   `,
				values: [enterpriseId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getOffersFromEnterprises(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT json_build_object(
					'nom de l entreprise', enterprises.name,
					'offers', json_agg(json_build_object(
										'description de l''offre', offers.description, 
										'réduction sur prix en pourcentage', offers.discount
									  ))
				  ) AS entreprise_et_services
		   FROM offers
		   JOIN enterprises ON enterprise_id = enterprises.id
		   WHERE enterprises.id = ($1)
		   GROUP BY enterprises.id;
		   `,
				values: [enterpriseId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getServicesFromEnterprise(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT json_build_object(
					'nom de l entreprise', enterprises.name,
					'services', json_agg(json_build_object(
										'nom du service', services.name, 
										'description', services.description, 
										'price', services.price
									  ))
				  ) AS entreprise_et_services
		   FROM services
		   JOIN enterprises ON enterprise_id = enterprises.id
		   WHERE enterprises.id = ($1)
		   GROUP BY enterprises.id;
		   `,
				values: [enterpriseId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (error) {
			console.error(error);
		}
	},
};

export default get_model;
