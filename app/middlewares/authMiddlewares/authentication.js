import jwt from "jsonwebtoken";
import auth_model from "../../models/auth_model.js";
import post_model from "../../models/post_model.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const authMiddleware = {
    //* création de token ici :
    // 1- s'il n'y a pas de token déjà présent dans le header de la requête, on en crée un et on l'envoie dans le header de la requête
    createToken(req, res, next) {
        const token = req.header.token;

        if (!token) {
            // console.log("locals from create token : ", res.locals.user);
            const enterpriseId = res.locals.user.enterprise_id || res.locals.user.enterpriseId;
            const clientId = res.locals.user.client_id || res.locals.user.clientId;
            const userId = res.locals.user.id | res.locals.user.userId;
            const userName = res.locals.user.user_name || res.locals.user.userName;
            console.log("username from createtoken is : ", userName);
            // déclaration du payload de token
            const payload = {
                //je prends l'id et le username du currentUser stocké dans la requête après avoir été trouvé en bdd par le précédent MW, afin que le token se crée avec les bonnes infos du user trouvé en bdd.
                enterpriseId,
                clientId,
                userId,
                userName,
            };
            // déclaration du secret de token
            const secret = process.env.SECRET ?? "sSsalazarSsSerpentard";
            // déclaration de la durée de vie du token
            const lifeTime = {
                expiresIn: "3h",
            };
            // création du token
            const newToken = jwt.sign(payload, secret, lifeTime);
            console.log(payload);
            console.log("Voici le token crée pour le user qui vient de s'authentifier ==> ", newToken);
            // j'envoie le token dans le header de la requête
            res.json({
                authenticated: true,
                token: newToken,
                userName,
                userId: userId,
                enterpriseId: enterpriseId,
                clientId: clientId,
            });
            console.log(newToken);
            next();
        } else {
        }
    },
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (!token) {
            res.json({
                authenticated: false,
                message: "there's no token to verify",
            });
            return;
        }
        jwt.verify(token, process.env.SECRET ?? "sSsalazarSsSerpentard", (err, decoded) => {
            if (err) {
                res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token.",
                });
                return;
            } else {
                const { userId, userName, clientId, enterpriseId } = decoded;
                console.log("decoded token : ", decoded);
                res.locals.user = {
                    userId,
                    userName,
                    clientId,
                    enterpriseId,
                };
                console.log(res.locals.user);
                if (!enterpriseId) {
                    res.locals.user.enterpriseId = req.headers.enterpriseid;
                } else if (!clientId || clientId === undefined) {
                    res.locals.user.clientId = req.headers.clientId;
                }
            }
        });
        next();
    },
    async verifyUser(req, res, next) {
        // extraction de l'email et pwd depuis le body de la requete
        const { mail, password } = req.body;
        // console.log(mail, password);
        try {
            // appel de la methode du datamapper qui renvoie lle user s'il le trouve
            const mailFound = await auth_model.getOneClientByItsEmail(mail);
            // console.log(mailFound);
            // si pas de user, renvoie d'error + return
            if (!mailFound) {
                res.json({ error: "...Mauvais identifiant" });
                return;
            }
            // console.log("email vérifié");
            const userFound = await auth_model.getOneClientByItsPwd(password, mailFound);
            if (!userFound) {
                res.json({ error: "...Mauvais identifiant" });
                return;
            }
            console.log("user found is : " + userFound.user_name);

            if (userFound.enterprise_id === null && userFound.client_id === null) {
                // Code à exécuter si enterprise_id est nul
                // console.log(
                //     "Le user n'a pas encore créé d'entreprise ni de profil client"
                // );
            } else if (userFound.client_id === null) {
                // Code à exécuter si client_id est nul
                console.log("Le user n'a pas de profil client");
            } else if (userFound.enterprise_id === null) {
                // Code à exécuter si client_id est nul
                console.log("Le user n'a pas d'entreprise");
            } else {
                // Code à exécuter si ni enterprise_id ni client_id ne sont nuls
                console.log("Le user à un profil client et une entreprise");
            }
            res.locals.user = userFound;
            console.log("res.locals : ", res.locals.user);
            next();
        } catch (error) {
            console.log(error);
            return;
        }
    },

    async createUser(req, res, next) {
        try {
            const { userName, mail, password } = req.body;
            const hashedPwd = bcrypt.hashSync(password, saltRounds);
            // console.log(hashedPwd);
            // Enregistrer l'utilisateur avec le mot de passe haché
            const results = await post_model.insertUsers(userName, mail, hashedPwd);

            if (results) {
                res.status(200).json({
                    message: "User created!",
                    statusCode: 200,
                    result: results,
                });
                next();
            } else {
                return;
            }
        } catch (error) {
            res.status(500).send({
                message: "Something went wrong, sorry.",
                statusCode: 500,
            });
            console.log(error);
        }
    },
};
export default authMiddleware;
