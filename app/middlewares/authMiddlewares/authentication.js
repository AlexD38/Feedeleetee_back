import jwt from "jsonwebtoken";
//  ce mw va créer le token si le sign controller renvoie un user puis next(); vers route graphQL

const authMiddleware = {
	//* création de token ici :
	// 1- s'il n'y a pas de token déjà présent dans le header de la requête, on en crée un et on l'envoie dans le header de la requête
	createToken(req, res, next) {
		const token = req.header.token;
		// console.log("token présent dans le header de la requête :", token);
		// const currentUser = req.user;
		// console.log("req.currentUser : ", req.currentUser);
		if (!token) {
			// déclaration du payload de token
			const payload = {
				//je prends l'id et le username du currentUser stocké dans la requête après avoir été trouvé en bdd par le précédent MW, afin que le token se crée avec les bonnes infos du user trouvé en bdd.
				userId: req.currentUser.id,
				name: req.currentUser.userName,
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
			req.header.token = newToken;
			console.log("voici le header de la requête : ", req.header.token);
			// je renvoie bonjour
			console.log({ greetings: `Bonjour nouveau : ${newToken}` });
			// et je laisse passer
			// next();
			// je vide le header de la requête pour que le front me le renvoi.
			// req.header.token = "";
		}
		next();
	},
	verifyToken: (req, res, next) => {
		const token = req.header.token;
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
			// TODO si token il y a , le vérifier, extraire les données (l'id du user) si c'est good, next sinon renvoi d'erreur grace aux arg du token.
		});
		next();
	},
};
export default authMiddleware;
