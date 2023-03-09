import jwt from "jsonwebtoken";
import auth_model from "../../models/auth_model.js";
import post_model from "../../models/post_model.js";
//  ce mw va créer le token si le sign controller renvoie un user puis next(); vers route graphQL

const authMiddleware = {
	//* création de token ici :
	// 1- s'il n'y a pas de token déjà présent dans le header de la requête, on en crée un et on l'envoie dans le header de la requête
	createToken(req, res, next) {
		const token = req.header.token;

		if (!token) {
			const { enterpriseId, clientId, userId, userName } = res.locals;
			// déclaration du payload de token
			const payload = {
				//je prends l'id et le username du currentUser stocké dans la requête après avoir été trouvé en bdd par le précédent MW, afin que le token se crée avec les bonnes infos du user trouvé en bdd.
				enterpriseId,
				clientId,
				userId,
			};
			// déclaration du secret de token
			const secret = process.env.SECRET ?? "sSsalazarSsSerpentard";
			// déclaration de la durée de vie du token
			const lifeTime = {
				expiresIn: "1h",
			};
			// création du token
			const newToken = jwt.sign(payload, secret, lifeTime);
			console.log(
				"Voici le token crée pour le user qui vient de s'authentifier ==> ",
				newToken
			);
			// j'envoie le token dans le header de la requête
			res.json({
				enterpriseId,
				clientId,
				userId,
				userName,
				token: newToken,
			});
			// je renvoie bonjour

			// et je laisse passer
			// next();
			// je vide le header de la requête pour que le front me le renvoi.
			// req.header.token = "";
		} else {
		}
		next();
	},
	verifyToken: (req, res, next) => {
		const token = req.header.token;
		if (!token) {
			res.json({ succes: false, message: "there's no token to verify" });
			return;
		}
		console.log({ greetings: `Bonjour déjà créé : ${token}` });
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				return res.status(500).send({
					auth: false,
					message: "Failed to authenticate token.",
				});
			}
			const { userId, name } = decoded;
			console.log({ userId, name });
			// si token il y a , le vérifier, extraire les données (l'id du user) si c'est good, next sinon renvoi d'erreur grace aux arg du token.
		});
		next();
	},
	async verifyUser(req, res, next) {
		// extraction de l'email et pwd depuis le body de la requete
		const { mail, password } = req.body;
		console.log(mail, password);
		try {
			// appel de la methode du datamapper qui renvoie lle user s'il le trouve
			const mailFound = await auth_model.getOneClientByItsEmail(mail);
			// console.log(mailFound);
			// si pas de user, renvoie d'error + return
			if (!mailFound) {
				res.json({ error: "...Mauvais identifiant" });
				return;
			}
			console.log("email vérifié : " + mailFound);
			const userFound = await auth_model.getOneClientByItsPwd(
				password,
				mailFound
			);
			if (!userFound) {
				res.json({ error: "...Mauvais identifiant" });
				return;
			}
			console.log("userFound is : " + userFound.user_name);

			if (
				userFound.enterprise_id === null &&
				userFound.client_id === null
			) {
				// Code à exécuter si enterprise_id est nul
				console.log(
					"Le user n'a pas encore créé d'entreprise ni de profil client"
				);
				res.locals.userId = userFound.id;
				res.locals.userName = userFound.user_name;
			} else if (userFound.client_id === null) {
				// Code à exécuter si client_id est nul
				console.log("Le user n'a pas de profil client");
				res.locals.enterpriseId = userFound.enterprise_id;
				res.locals.userName = userFound.user_name;
			} else if (userFound.enterprise_id === null) {
				// Code à exécuter si client_id est nul
				console.log("Le user n'a pas d'entreprise");
				res.locals.clientId = userFound.client_id;
				res.locals.userName = userFound.user_name;
			} else {
				res.locals.enterpriseId = userFound.enterprise_id;
				res.locals.clientId = userFound.client_id;
				res.locals.userId = userFound.id;
				res.locals.userName = userFound.user_name;

				// Code à exécuter si ni enterprise_id ni client_id ne sont nuls
				console.log("Le user à un profil client et une entreprise");
			}
			next();
		} catch (error) {
			console.log(error);
			return;
		}
	},
	async createUser(req, res, next) {
		try {
			const { userName, mail, password } = req.body;
			const results = await post_model.insertUsers(
				userName,
				mail,
				password
			);
			if (results) {
				res.status(200).json({
					message: "user created !",
					statusCode: 200,
					result: results,
				});
				next();
			} else {
				return;
			}
		} catch (error) {
			res.status(500).send({
				message: "Somehting went wrong, sorry.",
				statusCode: 500,
			});
			console.log(error);
		}
	},
};
export default authMiddleware;
