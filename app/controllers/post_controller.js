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
};

export default post_controller;
