import patch_model from "../models/patch_model.js";

const patch_controller = {
	async updateClient(req, res) {
		try {
			const clientId = req.params.id;
			const field = req.body.field;
			const value = req.body.value;

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
			const field = req.body.field;
			const value = req.body.value;

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
};

export default patch_controller;
