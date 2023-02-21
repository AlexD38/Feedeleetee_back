import auth_model from "../models/auth_model.js";

const signController = {
	async verifyUser(req, res, next) {
		// extraction de l'email et pwd depuis le body de la requete
		const { email, password } = req.body;
		console.log(email, password);
		try {
			// appel de la methode du datamapper qui renvoie lle user s'il le trouve
			const mailFound = await auth_model.getOneClientByItsEmail(email);
			console.log(mailFound);
			// si pas de user, renvoie d'error + return
			if (!mailFound) {
				res.json({ error: "mail not found...Mauvais identifiant" });
				return;
			}
			console.log("email vérifié" + mailFound.mail);
			const userFound = await auth_model.getOneClientByItsPwd(
				email,
				password
			);
			if (!userFound) {
				res.json({ error: "pwd not found...Mauvais identifiant" });
				return;
			}
			console.log(userFound);
			res.json({ success: "welcome : " + userFound });
			next();
		} catch (error) {
			console.log(error);
			return;
		}
	},
};

export default signController;

// *SignIn :
// ! 1- Récupérer le mail et le mdp dans le req.body
// ! 2- Vérifier le mail en bdd si ok => vérfier le mdp si ok =>
// ! 3- Créer et renvoyer le token à la session.
// ! 4- la session dit : ce token appartient au User n°38 présent en bdd.

// *Signup :
// ! 1- Récupérer le mail et le mdp dans le req.body
// ! 2- sauver le mail et mdp dans la bdd
// ! 3- Créer et renvoyer le token à la session.
