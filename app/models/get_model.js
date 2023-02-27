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
				  'length_of_appointment', length_of_appointment, 
				  'appointments.service_id',appointments.service_id, 
				  'services.name', services.name, 
				  'services.description', COALESCE(services.description, ''), 
				  'services.price', services.price,
				  'clients.id', COALESCE(clients.id, 0), 
				  'clients.first_name', clients.firstname, 
				  'clients.last_name', clients.lastname, 
				  'clients.email', COALESCE(clients.mail, ''),
				  'clients.tel', COALESCE(clients.tel, ''),
				  'offers.id', COALESCE(offers.id, 0), 
				  'offers.discount', COALESCE(offers.discount, 0), 
				  'offers.description', COALESCE(offers.description, '')
				)) AS appointments
			  FROM users
			  JOIN enterprises ON enterprise_id = enterprises.id
			  JOIN appointments ON appointments.enterprise_id = enterprises.id
			  JOIN clients ON appointments.client_id = clients.id
			  JOIN services ON services.enterprise_id = services.id
			  JOIN offers ON appointments.offer_id = offers.id
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
	async getClients() {
		try {
			const sqlQuery = `
            SELECT * FROM clients;`;
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (err) {
			console.error(err);
		}
	},
	async getEnterprise() {
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
	async getAppointments() {
		try {
			const sqlQuery = `SELECT * FROM appointments; `;
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getOffers() {
		try {
			const sqlQuery = `SELECT * FROM offers; `;
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getServices() {
		try {
			const sqlQuery = `SELECT * FROM services; `;
			const response = await client.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (error) {
			console.error(error);
		}
	},
};

export default get_model;
