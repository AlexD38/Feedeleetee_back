import client from "../database.js";

const dataMapper = {
	// déclarer que tableName est la fin de l'url
	// renommer la méthode "getInformations"
	// mettre table name dans la query sql
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

export default dataMapper;
