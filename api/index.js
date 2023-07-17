// import d'Express
import express from "express";
// création de server Express
const app = express();
import cors from "cors";

// import du pkg, pour utiliser le __dirname
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// import de la session Express
import session from "express-session";
// import du router Express
import router from "../app/router.js";
// import du dotenv pour aller chercher les credentials de la db
import dotenv from "dotenv";
// config pour dotenv
dotenv.config();

// définition du port d'écoute
const PORT = process.env.PORT || 4000;

// définition du titre du server Express
app.locals.siteName = "Feedeleetee";

// urlencoded pour pouvoir envoyer des données du front via requête POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow cors for everyone
app.use(cors());

// Express utilise la session et ses options
app.use(
	session({
		secret: process.env.SESSION_SECRET || "secret",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

// dfinition du chemin pour fichiers statiques
app.use(express.static(__dirname + "/public"));

// utilisation du mw d'auth ici
// app.use(signController.verifyUser);
//! authMiddleware.checkIfLogged
// utilisation du router
app.use(router);

app.get("/api", (req, res) => {
	const path = `/api/item/${v4()}`;
	res.setHeader("Content-Type", "text/html");
	res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
	res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
	const { slug } = req.params;
	res.end(`Item: ${slug}`);
});

// Ecoute du port + console du port d'écoute.
app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});
