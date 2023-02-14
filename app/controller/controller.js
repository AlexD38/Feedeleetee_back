import dataMapper from "../datamapper/datamapper.js";

const controller = {
	async clientsInformation(req, res) {
		try {
			let clientList = await dataMapper.getClients();
			if (clientList) {
				res.json(clientList);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
};

export default controller;
