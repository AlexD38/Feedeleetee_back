import client from "../database.js";

const get_model = {
	async getAllInfosForMyEnterprise(userId) {
		try {
			const sqlQuery = {
				text: `SELECT
				enterprises.name AS name_of_enterprise,
				ARRAY_AGG(
				 users.first_name || ' ' || users.last_name ORDER BY users.last_name
				) AS name_of_users,
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
				FROM users
				JOIN enterprises ON users.enterprise_id = enterprises.id
				JOIN appointments ON appointments.enterprise_id = enterprises.id
				JOIN clients ON clients.enterprise_id = enterprises.id
				JOIN offers ON offers.enterprise_id = enterprises.id
				JOIN services ON services.enterprise_id = enterprises.id
				WHERE users.id = ($1)
				GROUP BY enterprises.name, enterprises.logo, enterprises.description, appointments.day, appointments.time_of_day, appointments.length_of_appointment, appointments.payment_method, clients.firstname, clients.lastname, clients.mail, clients.tel, services.name, services.price, services.description, offers.discount, offers.description, offers.sales_before_offer
				ORDER BY name_of_enterprise;`,
				values: [userId],
			};
			const response = await client.query(sqlQuery);
			console.log(response.rows);
			// let data = response.rows;
			console.log(
				"voila le réssultat de la fonction enterpriseInfos : " +
					response.rows.length
			);
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
