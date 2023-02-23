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
	async createEnterprise(req, res) {
		const { name, address, logo, description } = req.body;

		const results = await post_model.insertEnterprise(
			name,
			address,
			logo,
			description
		);
		res.json(results);
		const enterpriseName = window.localStorage.setItem(
			"enterprise's name created",
			results.enterpriseName
		);
	},
	async attachEnterpriseToUser(req, res) {
		try {
			if (userId) {
				// ! const userId = récupérer depuis le token apres l'authentification du user
				const enterpriseName = windows.localStorage.getItem(
					"enterprise's name created"
				);
				// console.log(enterpriseCreated.enterpriseName);
				const userCreateEnterprise =
					await post_model.insertEnterpriseIdIntoUserTable(
						enterpriseName,
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
		const { day, timeOfDay, paymentMethod, offerId } = req.body;

		const results = await post_model.insertEnterprise(
			day,
			timeOfDay,
			offerId
		);
		res.json(results);
	},
	async createOffer(req, res) {
		const { salesBeforeOffer, description, discount } = req.body;

		const results = await post_model.insertOffers(
			salesBeforeOffer,
			description,
			discount
		);
		res.json(results);
	},
	async createService(req, res) {
		const { name, description, price, enterpriseId } = req.body;

		const results = await post_model.insertServices(
			name,
			description,
			price,
			enterpriseId
		);
		res.json(results);
	},
	async createUser(req, res, next) {
		try {
			const { firstName, lastName, mail, password } = req.body;

			const results = await post_model.insertUsers(
				firstName,
				lastName,
				mail,
				password
			);
			if (results) {
				res.redirect("/login");
			} else {
				return;
			}
		} catch (error) {
			console.log(error);
		}
	},
};

export default post_controller;
