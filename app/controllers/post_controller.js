import get_model from "../models/get_model.js";
import post_model from "../models/post_model.js";
import multer from "multer";

const post_controller = {
	async createClient(req, res, next) {
		try {
			const { firstname, lastname, mail, tel } = req.body;
			console.log(req.body);

			const results = await post_model.insertClient(
				firstname,
				lastname,
				mail,
				tel
			);
			res.locals.clientCreated = results;
			console.log("client has been created : ", res.locals.clientCreated);
			next();
		} catch (error) {
			console.log(error);
		}
	},

	async createEnterprise(req, res, next) {
		try {
			const {
				enterpriseName,
				enterpriseAddress,
				enterpriseDesc,
				enterpriseLogo,
			} = req.body;

			const results = await post_model.insertEnterprise(
				enterpriseName,
				enterpriseAddress,
				enterpriseLogo,
				enterpriseDesc
			);
			res.locals.enterpriseCreated = results;

			next();
		} catch (error) {
			res.status(500).send(error);
		}
	},

	async attachEnterpriseToUser(req, res) {
		try {
			const userId = res.locals.user.user;
			const enterpriseId = res.locals.enterpriseCreated?.enterpriseId;
			if (userId) {
				const userCreateEnterprise =
					await post_model.insertEnterpriseIdIntoUserTable(
						enterpriseId,
						userId
					);
				res.json({ userCreateEnterprise, enterpriseId });
			} else {
				res.json({ error: "You gotta be connected to do this..." });
			}
		} catch (error) {
			console.log(error);
		}
	},
	async attachClientToUser(req, res) {
		try {
			console.log(res.locals.clientCreated);
			const userId = res.locals.user.user;
			const clientId = res.locals.clientCreated?.id;
			// res.locals.user.clientId = clientId;
			if (userId) {
				const userCreateClient =
					await post_model.insertClientIdIntoUserTable(
						userId,
						clientId
					);
				res.json({
					success: `client ${clientId} has been attached to user : ${userId}`,
					userCreateClient,
				});
			} else {
				res.json({ error: "You gotta be connected to do this..." });
			}
		} catch (error) {
			console.log(error);
		}
	},
	async createAppointments(req, res) {
		const { day, timeOfDay, serviceId } = req.body.data;
		console.log(req.body.data);
		const enterpriseId = res.locals.user.enterpriseId;
		// console.log(enterpriseId);

		const results = await post_model.insertAppointements(
			day,
			timeOfDay,
			serviceId,
			enterpriseId
		);
		res.json(results);
	},
	async createOffer(req, res) {
		const { description, discount } = req.body.data;
		const enterpriseId = res.locals.user.enterpriseId;

		const results = await post_model.insertOffers(
			description,
			discount,
			enterpriseId
		);
		res.json(results);
	},
	async createService(req, res) {
		const { description, price, duration } = req.body.data;
		console.log(req.body);
		const enterpriseId = res.locals.user.enterpriseId;

		const results = await post_model.insertServices(
			description,
			price,
			duration,
			enterpriseId
		);
		res.json(results);
	},
	async uploadLogo(req, res) {
		try {
			const imageData = req.file;
			console.log(imageData); // récupère les données de l'image en bytea
			const enterpriseId = res.locals.user.enterpriseId;
			console.log(imageData);

			const imageToUpload = req.file.buffer;
			// console.log("buffer : ", imageToUpload);

			const result = await post_model.insertLogo(
				imageToUpload,
				enterpriseId
			);
			if (result) {
				res.status(200).json({
					mesage: `Image téléchargée avec succès. Pour l'entreprise : ${result.name}`,
					image: imageToUpload.toString("base64").toString("utf8"),
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).send(
				"Une erreur est survenue lors du téléchargement de l'image."
			);
		}
	},
};

export default post_controller;
