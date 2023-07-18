import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

console.log("database: " + pool.database, "User: " + pool.user);

pool.connect(function (err) {
	if (err) {
		console.error("Could not connect to PostgreSQL database: ", err);
	} else {
		console.log("Connected to PostgreSQL database");
	}
});

export default pool;
