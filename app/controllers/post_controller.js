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
			req.session.clientCreated = results;
			console.log(
				"client has been created : ",
				req.session.clientCreated
			);
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
			req.session.enterpriseCreated = results;

			next();
		} catch (error) {
			res.status(500).send(error);
		}
	},

	async attachEnterpriseToUser(req, res) {
		try {
			const userId = req.session.user.userId;
			const enterpriseId = req.session.enterpriseCreated?.enterpriseId;
			if (userId) {
				const userCreateEnterprise =
					await post_model.insertEnterpriseIdIntoUserTable(
						enterpriseId,
						userId
					);
				res.json({ userCreateEnterprise, enterpriseId, success: true });
			} else {
				res.json({
					error: "Something went wrong here...",
					success: false,
				});
			}
		} catch (error) {
			console.log(error);
		}
	},
	async attachClientToUser(req, res) {
		try {
			console.log(req.session.clientCreated);
			const userId = req.session.user.userId;
			const clientId = req.session.clientCreated?.id;
			// req.session.user.clientId = clientId;
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
		const enterpriseId = req.session.user.enterpriseId;
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
		const enterpriseId = req.session.user.enterpriseId;

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
		const enterpriseId = req.session.user.enterpriseId;

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
			const enterpriseId = req.session.user.enterpriseId;
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
