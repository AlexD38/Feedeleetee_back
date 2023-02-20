import client from "../database.js";

const patch_model = {
	//je passe en argument, ce que j'extrair de req.body
	async updateClient(field, value, clientId) {
		// getion d'erreur avec try / catch
		try {
			const sqlQuery = {
				text: `UPDATE clients SET ${field} = $1 WHERE id = $2`,
				values: [value, clientId],
			};
			// j'execute la query
			await client.query(sqlQuery);
			// je range mon client dans la variable client created
			let clientUpdated = sqlQuery.values[0];

			// je renvoie le résultat
			const result = {
				succes: `${field} is now : ${clientUpdated}, it's been well updated into database for the client number ${clientId}`,
			};
			return result;
		} catch (error) {
			console.error(error);
		}
	},
	//je passe en argument, ce que j'extrair de req.body
	async updateEnterprise(field, value, enterpriseId) {
		// getion d'erreur avec try / catch
		try {
			const sqlQuery = {
				text: `UPDATE enterprises SET ${field} = $1 WHERE id = $2`,
				values: [value, enterpriseId],
			};
			// j'execute la query
			await client.query(sqlQuery);
			// je range mon client dans la variable client created
			let tableUpdated = sqlQuery.values[0];

			// je renvoie le résultat
			const result = {
				succes: ` ${field} is now : ${tableUpdated}. It has been well updated into database for the enterprise number ${enterpriseId}`,
			};
			return result;
		} catch (error) {
			console.error(error);
		}
	},
};

export default patch_model;
