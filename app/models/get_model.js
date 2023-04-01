import client from "../database.js";

const get_model = {
	async getAllInfosForMyEnterprise(userId, enterprise_id) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM get_quick_view1($1, $2)
			  `,
				values: [userId, enterprise_id],
			};
			const response = await client.query(sqlQuery);
			console.log(response.rows[0]);

			return response.rows[0];
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
				SELECT clients.id,  firstname, lastname, mail, tel FROM enterprises_got_clients JOIN  clients ON clients_id=clients.id WHERE enterprises_id=($1);
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
			for (const enterprise of data) {
				console.log(enterprise.logo);
				if (enterprise.logo) {
					const newImage = enterprise.logo
						.toString("base64")
						.toString("utf8");
					enterprise.logo = newImage;
				}
				console.log(enterprise);
			}
			// console.log(data);
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
			if (!response.rows[0].logo) {
				return data;
			} else {
				const newImage = response.rows[0].logo
					.toString("base64")
					.toString("utf8");
				response.rows[0].logo = newImage;
			}
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getAppointmentsFromEnterprise(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT appointments.id,  day, time_of_day, client_id, firstname, lastname, mail, tel FROM appointments   left JOIN clients ON client_id = clients.id WHERE appointments.enterprise_id = ($1);
	   `,
				values: [enterpriseId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			// console.log(response.rows);
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getOffersFromEnterprises(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM offers WHERE enterprise_id = ($1);
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
				text: `SELECT * FROM services WHERE enterprise_id = ($1);`,
				values: [enterpriseId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getNextAppointments(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM get_next_3_appointments($1);`,
				values: [enterpriseId],
			};
			const response = await client.query(sqlQuery);
			let data = response.rows;
			console.log(response);
			return data;
		} catch (error) {
			console.error(error);
		}
	},
};

export default get_model;
