import pg from "pg";
import dotenv from "dotenv";

const Client = pg.Client;
dotenv.config();

// Define the connection configuration
const client = new Client({
	connectionString: process.env.POSTGRES_URL,
});

console.log("database: " + client.database, "User: " + client.user);

client.connect(function (err) {
	if (err) {
		console.error("Could not connect to PostgreSQL database: ", err);
	} else {
		console.log("Connected to PostgreSQL database");
	}
});

export default client;
