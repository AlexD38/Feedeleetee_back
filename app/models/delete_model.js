import client from "../database.js";

const delete_model = {
	async deleteRecord(tableName, recordId) {
		try {
			const sqlQuery = {
				text: `DELETE FROM ${tableName} WHERE id = $1;`,
				values: [recordId],
			};
			// j'execute la query
			await client.query(sqlQuery);

			if (!recordId) {
				// si tout est ok, bah console log c ok !
				console.log(`${recordId} n'existe pas en base de donnée`);
			} else if (!tableName) {
				console.log(`${tableName} n'existe pas en base de donnée`);
			}
			// je renvoie le résultat
			const result = {
				succes: `record number : ${recordId} from ${tableName} is now deleted from database`,
			};

			return result;
		} catch (error) {
			console.error(error);
		}
	},
};

export default delete_model;
