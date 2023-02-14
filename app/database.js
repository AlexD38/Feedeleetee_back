import pg from "pg";
import dotenv from "dotenv";
const Client = pg.Client;
dotenv.config();

const client = new Client({
	connectionString: process.env.PG_URL,
});

console.log(client.database, client.user);

client.connect(function (err) {
	if (err) {
		console.error("Could not connect to PostgreSQL database: ", err);
	} else {
		console.log("Connected to PostgreSQL database");
	}
});

export default client;
