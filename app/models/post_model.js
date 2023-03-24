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
        success: `${firstName} ${lastName} well added to database`,
      };

      return result;
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
      console.log(results);
      const enterpriseCreated = results.rows[0];

      if (enterpriseCreated) {
        console.log(`${enterpriseCreated.name} créé en base de donnée`);
      } else {
        console.log(`${enterpriseCreated.name} n'a pas pu être entré en bdd`);
      }
      const result = {
        success: `${enterpriseCreated.name} well added to database`,
        enterprise: `${enterpriseCreated.name} with id : ${enterpriseCreated.id}`,
        enterpriseId: enterpriseCreated.id,
      };
      return result;
    } catch (error) {
      console.log(error);
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
        success: `${clientId} has been created by user : ${userId}`,
      };
      return result;
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
        console.log(`${appointmentCreated} n'a pas pu être entré en bdd`);
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
        success: `Offer : ${name}, ${description},with price :  ${price} $, well added to database`,
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
};

export default post_model;
