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
				success: `${field} is now : ${tableUpdated}, it's been well updated into database for the client number ${clientId}`,
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
			const findCLientById = {
				text: `SELECT * FROM clients WHERE id = ($1);`,
				values: [clientId],
			};
			const resultFromClientTable = await client.query(findCLientById);
			const clientFound = resultFromClientTable.rows[0];
			if (!clientFound) {
				console.log("Client not found");
				return;
			}
			console.log(
				"client found is " +
					clientFound.firstname +
					" " +
					clientFound.lastname
			);
			// vérifier si client_id est null
			const verifyIfClientIdIsNull = {
				text: `SELECT client_id FROM appointments WHERE id =($1);`,
				values: [appointmentId],
			};
			const resultFromClientIdColumn = await client.query(
				verifyIfClientIdIsNull
			);
			const clientIdCOlumnFound = resultFromClientIdColumn.rows[0];
			console.log(
				"client id for appointment found is : " +
					clientIdCOlumnFound?.client_id
			);
			if (!clientIdCOlumnFound) {
				console.log("le rendez-vous n'existe pas");
				return;
			} else if (
				clientIdCOlumnFound.client_id != null &&
				clientIdCOlumnFound.client_id != undefined
			) {
				console.log("rendez-vous déjà pris par quelqu'un");
				return;
			} else {
				// insertion du client dans le rendez-vous
				const InsertClientIntoAppointment = {
					text: `UPDATE appointments SET client_id = ($1) WHERE id = ($2);`,
					values: [clientFound.id, +appointmentId],
				};
				const appointmentUpdated = await client.query(
					InsertClientIntoAppointment
				);
				if (!appointmentUpdated.rowCount === 0) {
					console.log("Appointment not fupdated");
					return;
				}
				console.log(
					"number of affected row : " + appointmentUpdated.rowCount
				);
				return appointmentUpdated;
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
				success: ` ${field} is now : ${tableUpdated}. It has been well updated into database for the enterprise number ${enterpriseId}`,
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
				success: ` ${field} is now : ${tableUpdated}. It has been well updated into database for the enterprise number ${appointmentId}`,
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
				success: ` ${field} is now : ${tableUpdated}. It has been well updated into database for the enterprise number ${offerId}`,
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
				success: ` ${field} is now : ${tableUpdated}. It has been well updated into database for the enterprise number ${serviceId}`,
			};
			return result;
		} catch (error) {
			console.error(error);
		}
	},
};

export default patch_model;
