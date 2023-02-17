import client from "../database.js";

const post_model = {
	//je passe en argument, ce que j'extrair de req.body
	async insertClient(firstName, lastName, mail, tel) {
		// getion d'erreur avec try / catch
		try {
			const sqlQuery = {
				text: `INSERT INTO
                clients (
                firstname,
                lastname,
                mail,
                tel
                )
                VALUES 
                ($1,$2,$3,$4)
                `,
				values: [firstName, lastName, mail, tel],
			};
			// j'execute la query
			await client.query(sqlQuery);
			// je range mon client dans la variable client created
			let clientCreated = sqlQuery.values;
			// getion d'erreur supplémentaire avec if else
			if (clientCreated && clientCreated != "undefined") {
				// si tout est ok, bah console log c ok !
				console.log(`${clientCreated} créé en base de donnée`);
			} else {
				// si le client entré est undefined ou que rien n'est reçu du body, je console.log l'erreur.
				console.log(`${clientCreated} n'a pas pu être entré en bdd`);
			}
			// je renvoie le résultat
			const result = {
				succes: `${firstName} ${lastName} well added to database`,
			};

			return result;
		} catch (error) {
			console.error(error);
		}
	},
	async insertEnterprise(name, address, logo, description) {
		try {
			const sqlQuery = {
				text: `INSERT INTO
                enterprises (
                name,
                address,
                logo,
                description
                )
                VALUES 
                ($1,$2,$3,$4)
                `,
				values: [name, address, logo, description],
			};
			await client.query(sqlQuery);
			let enterpriseCreated = sqlQuery.values;

			if (enterpriseCreated && enterpriseCreated != "undefined") {
				console.log(`${enterpriseCreated} créé en base de donnée`);
			} else {
				console.log(
					`${enterpriseCreated} n'a pas pu être entré en bdd`
				);
			}
			const result = {
				succes: `${name} well added to database`,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertAppointements(day, timeOfDay, serviceId) {
		try {
			const sqlQuery = {
				text: `INSERT INTO
                appointments (
                day,
                time_of_day,
                service_id,
                )
                VALUES 
                ($1,$2,$3)
                `,
				values: [day, timeOfDay, serviceId],
			};
			await client.query(sqlQuery);
			let appointmentCreated = sqlQuery.values;

			if (appointmentCreated && appointmentCreated != "undefined") {
				console.log(`${appointmentCreated} créé en base de donnée`);
			} else {
				console.log(
					`${appointmentCreated} n'a pas pu être entré en bdd`
				);
			}
			const result = {
				succes: `${day} ${timeOfDay} well added to database`,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertOffers(salesBeforeOffer, description, discount) {
		//! FRANCAIS ?
		try {
			const sqlQuery = {
				text: `INSERT INTO
                offers (
                sales_before_offer,
                description,
                réduction
                )
                VALUES 
                ($1,$2,$3)
                `,
				values: [salesBeforeOffer, description, discount],
			};
			await client.query(sqlQuery);
			let offerCreated = sqlQuery.values;

			if (offerCreated && offerCreated != "undefined") {
				console.log(`${offerCreated} créé en base de donnée`);
			} else {
				console.log(`${offerCreated} n'a pas pu être entré en bdd`);
			}
			const result = {
				succes: `L'offre : ${description}, (- ${discount}%), well added to database`,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
};

export default post_model;
