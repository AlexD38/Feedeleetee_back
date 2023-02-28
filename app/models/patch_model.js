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
			let tableUpdated = sqlQuery.values[0];

			// je renvoie le résultat
			const result = {
				succes: `${field} is now : ${tableUpdated}, it's been well updated into database for the client number ${clientId}`,
			};
			return result;
		} catch (error) {
			console.error(error);
		}
	},
	//je passe en argument, ce que j'extrair de req.body
	async insertClientIntoAppointment(clientId, appointmentId) {
		// getion d'erreur avec try / catch
		try {
			const sqlQuery = {
				text: `SELECT * FROM UPDATE_APPOINTMENT($1, $2);
				;
				`,
				values: [clientId, appointmentId],
			};
			// j'execute la query
			const result = await client.query(sqlQuery);
			console.log(result);
			// je range mon client dans la variable client created
			if (result.rowCount > 0) {
				return {
					success: true,
					message: "Updated client into appointment is successfull !",
				};
			} else {
				return {
					success: false,
					message: "woops... problem here",
				};
			}
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
	async updateAppointments(field, value, appointmentId) {
		// getion d'erreur avec try / catch
		try {
			const sqlQuery = {
				text: `UPDATE appointments SET ${field} = $1 WHERE id = $2`,
				values: [value, appointmentId],
			};
			// j'execute la query
			await client.query(sqlQuery);
			// je range mon client dans la variable client created
			let tableUpdated = sqlQuery.values[0];

			// je renvoie le résultat
			const result = {
				succes: ` ${field} is now : ${tableUpdated}. It has been well updated into database for the enterprise number ${appointmentId}`,
			};
			return result;
		} catch (error) {
			console.error(error);
		}
	},
	async updateOffers(field, value, offerId) {
		// getion d'erreur avec try / catch
		try {
			const sqlQuery = {
				text: `UPDATE offers SET ${field} = $1 WHERE id = $2`,
				values: [value, offerId],
			};
			// j'execute la query
			await client.query(sqlQuery);
			// je range mon client dans la variable client created
			let tableUpdated = sqlQuery.values[0];

			// je renvoie le résultat
			const result = {
				succes: ` ${field} is now : ${tableUpdated}. It has been well updated into database for the enterprise number ${offerId}`,
			};
			return result;
		} catch (error) {
			console.error(error);
		}
	},
	async updateServices(field, value, serviceId) {
		// getion d'erreur avec try / catch
		try {
			const sqlQuery = {
				text: `UPDATE services SET ${field} = $1 WHERE id = $2`,
				values: [value, serviceId],
			};
			// j'execute la query
			await client.query(sqlQuery);
			// je range mon client dans la variable client created
			let tableUpdated = sqlQuery.values[0];

			// je renvoie le résultat
			const result = {
				succes: ` ${field} is now : ${tableUpdated}. It has been well updated into database for the enterprise number ${serviceId}`,
			};
			return result;
		} catch (error) {
			console.error(error);
		}
	},
};

export default patch_model;
