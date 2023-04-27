import { response } from "express";
import client from "../database.js";

const post_model = {
	//je passe en argument, ce que j'extrair de req.body
	async insertClient(firstname, lastname, mail, tel) {
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
				RETURNING *
                `,
				values: [firstname, lastname, mail, tel],
			};
			// j'execute la query
			let results = await client.query(sqlQuery);
			let clientCreated = results.rows[0];
			// je range mon client dans la variable client created
			let clientValues = sqlQuery.values;

			// getion d'erreur supplémentaire avec if else
			if (clientValues && clientValues != "undefined") {
				// si tout est ok, bah console log c ok !
				console.log(`${clientValues} créé en base de donnée`);
			} else {
				// si le client entré est undefined ou que rien n'est reçu du body, je console.log l'erreur.
				console.log(`${clientValues} n'a pas pu être entré en bdd`);
			}

			return clientCreated;
		} catch (error) {
			console.error(error);
		}
	},
	async insertEnterprise(name, address, logo, description) {
		try {
			const sqlQuery = {
				text: `INSERT INTO enterprises (name, address, logo, description)
				VALUES ($1, $2, $3, $4)
				RETURNING id, name, address, logo, description;
				
                `,
				values: [name, address, logo, description],
			};
			const results = await client.query(sqlQuery);
			console.log(results.rows[0]);
			const enterpriseCreated = results.rows[0];
			if (enterpriseCreated.id) {
				console.log(`${enterpriseCreated.name} créé en base de donnée`);
			} else {
				console.log(
					`${enterpriseCreated.name} n'a pas pu être entré en bdd`
				);
			}
			const result = {
				success: `${enterpriseCreated.name} well added to database`,
				enterprise: `${enterpriseCreated.name} with id : ${enterpriseCreated.id}`,
				enterpriseId: enterpriseCreated.id,
			};
			return result;
		} catch (error) {
			console.log(error.detail);
		}
	},
	async insertEnterpriseIdIntoUserTable(enterpriseId, userId) {
		try {
			const sqlQuery = {
				text: `UPDATE users
				SET enterprise_id = $1
				WHERE id = $2;
                `,
				values: [enterpriseId, userId],
			};
			const results = await client.query(sqlQuery);
			const enterpriseAttached = results.rowCount;
			if (enterpriseAttached < 1) {
				res.json({ error: "Enterprise cannot be attached" });
			}
			console.log(
				`${userId} just added an enterprise number ${sqlQuery.values[0]} to its profile !`
			);
			const result = {
				success: `You just added your enterprise to you profile, congrats ! ;)`,
				enterpriseId: sqlQuery.values[0],
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertClientIdIntoUserTable(userId, clientId) {
		try {
			const sqlQuery = {
				text: `UPDATE users SET client_id = $2 WHERE users.id = $1 RETURNING *;

                `,
				values: [userId, clientId],
			};
			const results = await client.query(sqlQuery);
			const clientAttached = results.rows[0];

			return clientAttached;
		} catch (error) {
			console.log(error);
		}
	},
	async insertAppointements(day, timeOfDay, serviceId, enterpriseId) {
		try {
			const sqlQuery = {
				text: `INSERT INTO appointments (day, time_of_day, service_id, enterprise_id)
				VALUES ($1, $2, $3, $4)
				RETURNING *`,
				values: [day, timeOfDay, serviceId, enterpriseId],
			};
			const appointmentCreated = await client.query(sqlQuery);
			const results = appointmentCreated.rows[0];
			console.log(results);
			if (results && results != "undefined") {
				console.log(
					`${results.day}, à ${results.time_of_day}h créé en base de donnée`
				);
			} else {
				console.log(
					`${appointmentCreated} n'a pas pu être entré en bdd`
				);
			}
			const result = {
				results,
				success: `${day} ${timeOfDay} well added to database`,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertServices(description, price, duration, enterpriseId) {
		try {
			const sqlQuery = {
				text: `INSERT INTO
                services (
                description,
                price, duration, enterprise_id
                )
                VALUES 
                ($1,$2,$3,$4) RETURNING *
                `,
				values: [description, price, duration, enterpriseId],
			};
			const results = await client.query(sqlQuery);
			let serviceCreated = results.rows[0];

			if (serviceCreated && serviceCreated != "undefined") {
				console.log(serviceCreated);
				console.log(`Service créé en base de donnée`);
			} else {
				console.log(`${serviceCreated} n'a pas pu être entré en bdd`);
			}
			const result = {
				success: `Offer : ${description},with price :  ${price} $, well added to database`,
				serviceCreated,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertUsers(userName, mail, password) {
		//! FRANCAIS ?
		try {
			const sqlQuery = {
				text: `INSERT INTO
                users (
                user_name,
                mail,
				password
                )
                VALUES 
                ($1,$2,$3)
                `,
				values: [userName, mail, password],
			};
			let results = await client.query(sqlQuery);
			console.log(results.rowCount);
			const newUser = results.rowCount;

			if (!newUser > 0) {
				console.log("le user n'a pas pu être créé en base de donnéee");
				res.json = { error: "User cannot be created." };
			}
			const result = {
				success: `Le user : ${userName} , well added to database`,
			};
			return result;
		} catch (error) {
			response.json("no");
			// res.json = { error: "nope" };
			console.log("error" + error);
		}
	},
	async insertOffers(description, discount, enterpriseId) {
		try {
			const sqlQuery = {
				text: `INSERT INTO
                offers (
                description,
                discount, enterprise_id
                )
                VALUES 
                ($1,$2,$3) RETURNING *
                `,
				values: [description, discount, enterpriseId],
			};
			const results = await client.query(sqlQuery);
			const offerCreated = results.rows[0];

			if (offerCreated && offerCreated != "undefined") {
				console.log(`${offerCreated} créé en base de donnée`);
			} else {
				console.log(`${offerCreated} n'a pas pu être entré en bdd`);
			}
			const result = {
				success: `L'offre : ${description}, (- ${discount}%), well added to database`,
				offerCreated,
			};
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	async insertLogo(imageToUpload, enterprise_id) {
		try {
			console.log(enterprise_id);
			const sqlQuery = {
				text: `UPDATE enterprises SET logo= ($1) WHERE enterprises.id = ($2) RETURNING *`,
				values: [imageToUpload, enterprise_id],
			};
			const results = await client.query(sqlQuery);
			const imageUploaded = results.rows[0];
			// console.log(imageUploaded);
			if (imageUploaded) {
				return imageUploaded;
			}
		} catch (error) {
			console.log(error);
		}
	},
};

export default post_model;
