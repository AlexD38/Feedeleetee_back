import express from "express";
const app = express();

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import session from "express-session";
import router from "./app/router.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

app.locals.siteName = "Feedeleetee";

app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

app.use(express.static(__dirname + "/public"));

app.use(router);

// app.use(router);

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});
