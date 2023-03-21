import get_model from "../models/get_model.js";
import post_model from "../models/post_model.js";

const post_controller = {
	async createClient(req, res) {
		const { firstName, lastName, mail, tel } = req.body;

		const results = await post_model.insertClient(
			firstName,
			lastName,
			mail,
			tel
		);
		res.json(results);
		const clientId = window.localStorage.setItem(
			"client's id created",
			results.clientId
		);
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
			console.log(
				"user authenticated : " +
					res.locals.user.userName +
					" with id : " +
					res.locals.user.user +
					" enterprise just created by the authenticated user :  " +
					res.locals.enterpriseCreated?.enterprise
			);
			// console.log(
			// 	"enterprise id : " + res.locals.enterpriseCreated?.enterpriseId
			// );
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
			if (userId) {
				// ! const userId = récupérer depuis le token apres l'authentification du user
				const clientId = windows.localStorage.getItem(
					"client's id created"
				);
				// console.log(clientId);
				const userCreateClient =
					await post_model.insertClientIdIntoUserTable(
						clientId,
						userId
					);
				res.json(results);
			} else {
				res.json({ error: "You gotta be connected to do this..." });
			}
		} catch (error) {
			console.log(error);
		}
	},
	async createAppointments(req, res) {
		const { day, timeOfDay, length, serviceId } = req.body;
		const enterpriseId = req.params.id;

		const results = await post_model.insertAppointements(
			day,
			timeOfDay,
			length,
			serviceId,
			enterpriseId
		);
		res.json(results);
	},
	async createOffer(req, res) {
		const { salesBeforeOffer, description, discount } = req.body;
		const enterpriseId = req.params.id;

		const results = await post_model.insertOffers(
			salesBeforeOffer,
			description,
			discount,
			enterpriseId
		);
		res.json(results);
	},
	async createService(req, res) {
		const { name, description, price } = req.body;
		const enterpriseId = req.params.id;

		const results = await post_model.insertServices(
			name,
			description,
			price,
			enterpriseId
		);
		res.json(results);
	},
};

export default post_controller;
