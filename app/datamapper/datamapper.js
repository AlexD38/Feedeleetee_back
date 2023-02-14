import client from "../database.js";

const dataMapper = {
	async getClients() {
		try {
			const sqlQuery = `
            SELECT * FROM clients;`;
			const response = await client.query(sqlQuery);
			let clients = response.rows;
			return clients;
		} catch (err) {
			errorHandler.logError(err);
		}
		return;
	},
};

export default dataMapper;
