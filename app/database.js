import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";

const Client = pg.Client;
dotenv.config();

// Read the SSL certificate and private key files
const sslConfig = {
	rejectUnauthorized: false,
	cert: fs.readFileSync("server.crt"),
	key: fs.readFileSync("server.key"),
};

// Define the connection configuration
const client = new Client({
	connectionString: process.env.PG_URL,
	ssl: sslConfig, // Add the SSL configuration here
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
