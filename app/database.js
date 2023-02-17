// import du module pg pour la db
import pg from "pg";

import dotenv from "dotenv";
// définition du client
const Client = pg.Client;
dotenv.config();

// défintiion de la connection
const client = new Client({
	connectionString: process.env.PG_URL,
});

console.log("databse : " + client.database, "User : " + client.user);

client.connect(function (err) {
	if (err) {
		console.error("Could not connect to PostgreSQL database: ", err);
	} else {
		console.log("Connected to PostgreSQL database");
	}
});

export default client;
