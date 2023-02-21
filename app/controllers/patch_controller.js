import patch_model from "../models/patch_model.js";

const patch_controller = {
	async updateClient(req, res) {
		try {
			const clientId = req.params.id;
			const { field, value } = req.body;

			const client = await patch_model.updateClient(
				field,
				value,
				clientId
			);

			if (!client) {
				return res
					.status(404)
					.json({ error: "La client n'a pas été trouvé" });
			}

			// tester avec res.send
			res.json(client);
		} catch (error) {
			console.log(error);
			res.status(404).json({
				error: "La client n'a pas pu être modifié...",
			});
		}
	},
	async updateEnterprise(req, res) {
		try {
			const enterpriseId = req.params.id;
			const { field, value } = req.body;

			const enterprise = await patch_model.updateEnterprise(
				field,
				value,
				enterpriseId
			);

			if (!enterprise) {
				return res
					.status(404)
					.json({ error: "L'enterprise n'a pas été trouvée" });
			}

			// tester avec res.send
			res.json(enterprise);
		} catch (error) {
			console.log(error);
			res.status(404).json({
				error: "L'enterprise n'a pas pu être modifiée...",
			});
		}
	},
	async updateAppointment(req, res) {
		try {
			const appointmentId = req.params.id;
			const { field, value } = req.body;

			const appointment = await patch_model.updateAppointments(
				field,
				value,
				appointmentId
			);

			if (!appointment) {
				return res
					.status(404)
					.json({ error: "Le rendez-vous n'a pas été trouvé" });
			}

			// tester avec res.send
			res.json(appointment);
		} catch (error) {
			console.log(error);
			res.status(404).json({
				error: "Le rendez-vous n'a pas pu être modifié...",
			});
		}
	},
	async updateOffer(req, res) {
		try {
			const offerId = req.params.id;
			const { field, value } = req.body;

			const offer = await patch_model.updateOffers(field, value, offerId);

			if (!offer) {
				return res
					.status(404)
					.json({ error: "L'offre n'a pas été trouvée" });
			}

			// tester avec res.send
			res.json(offer);
		} catch (error) {
			console.log(error);
			res.status(404).json({
				error: "L'offre n'a pas pu être modifiée...",
			});
		}
	},
	async updateService(req, res) {
		try {
			const serviceId = req.params.id;
			const { field, value } = req.body;

			const service = await patch_model.updateServices(
				field,
				value,
				serviceId
			);

			if (!service) {
				return res
					.status(404)
					.json({
						error: "Le service en question n'a pas été trouvé",
					});
			}

			// tester avec res.send
			res.json(service);
		} catch (error) {
			console.log(error);
			res.status(404).json({
				error: "Le service n'a pas pu être modifié...",
			});
		}
	},
};

export default patch_controller;
