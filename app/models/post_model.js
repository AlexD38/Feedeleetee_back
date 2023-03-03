import { response } from "express";
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
				enterpriseName: `${name}`,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertEnterpriseIdIntoUserTable(enterpriseName, userId) {
		try {
			const sqlQuery = {
				text: `INSERT INTO
                users (
                enterprise_id)
                VALUES 
                ($1) WHERE user_id = ($2)
                `,
				values: [enterpriseName, userId],
			};
			await client.query(sqlQuery);
			let enterpriseattached = sqlQuery.values;

			if (!enterpriseName || !userId) {
				res.json({ error: "Enterprise cannot be attached" });
			}
			const result = {
				succes: `${enterpriseName} has been created by user : ${userId}`,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertClientIdIntoUserTable(clientId, userId) {
		try {
			const sqlQuery = {
				text: `INSERT INTO
                users (
                client_id)
                VALUES 
                ($1) WHERE user_id = ($2)
                `,
				values: [clientId, userId],
			};
			await client.query(sqlQuery);
			let clientAttached = sqlQuery.values;

			if (!clientId || !userId) {
				res.json({ error: "Client cannot be attached" });
			}
			const result = {
				succes: `${clientId} has been created by user : ${userId}`,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertAppointements(day, timeOfDay, length, serviceId, enterpriseId) {
		try {
			const sqlQuery = {
				text: `INSERT INTO
                appointments (
                day,
                time_of_day,
				length_of_appointment,
                service_id, enterprise_id
                )
                VALUES 
                ($1,$2,$3,$4,$5)
                `,
				values: [day, timeOfDay, length, serviceId, enterpriseId],
			};
			const query = await client.query(sqlQuery);
			let appointmentCreated = query;
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
	async insertServices(name, description, price, enterpriseId) {
		try {
			const sqlQuery = {
				text: `INSERT INTO
                services (
                name,
                description,
                price, enterprise_id
                )
                VALUES 
                ($1,$2,$3,$4)
                `,
				values: [name, description, price, enterpriseId],
			};
			await client.query(sqlQuery);
			let serviceCreated = sqlQuery.values;

			if (serviceCreated && serviceCreated != "undefined") {
				console.log(`${serviceCreated} créé en base de donnée`);
			} else {
				console.log(`${serviceCreated} n'a pas pu être entré en bdd`);
			}
			const result = {
				succes: `Offer : ${name}, ${description},with price :  ${price} $, well added to database`,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertUsers(firstName, lastName, mail, password) {
		//! FRANCAIS ?
		try {
			const sqlQuery = {
				text: `INSERT INTO
                users (
                first_name,
                last_name,
                mail,
				password
                )
                VALUES 
                ($1,$2,$3, $4)
                `,
				values: [firstName, lastName, mail, password],
			};
			await client.query(sqlQuery);
			let userCreated = sqlQuery.values;

			if (!userCreated) {
				console.log("le user n'a pas pu être créé en base de donnéee");
				res.json = { error: "User cannot be created." };
			}
			const result = {
				succes: `Le user : ${firstName} ${lastName}, well added to database`,
			};
			return result;
		} catch (error) {
			response.json("no");
			// res.json = { error: "nope" };
			console.log(error);
		}
	},
	async insertOffers(salesBeforeOffer, description, discount, enterpriseId) {
		try {
			const sqlQuery = {
				text: `INSERT INTO
                offers (
                sales_before_offer,
                description,
                discount, enterprise_id
                )
                VALUES 
                ($1,$2,$3, $4)
                `,
				values: [salesBeforeOffer, description, discount, enterpriseId],
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
