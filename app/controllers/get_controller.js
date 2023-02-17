import dataMapper from "../models/get_model.js";

const get_controller = {
	// changer await datamapper.blabla par getInfos
	//! définir ici req.url split pour table name et le passser en arg des methodes.
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
	async enterpriseInformation(req, res) {
		try {
			let enterprises = await dataMapper.getEnterprise();
			if (enterprises) {
				res.json(enterprises);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async serviceInformation(req, res) {
		try {
			let services = await dataMapper.getServices();
			if (services) {
				res.json(services);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async offerInformation(req, res) {
		try {
			let offers = await dataMapper.getOffers();
			if (offers) {
				res.json(offers);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async appointmentInformation(req, res) {
		try {
			let offers = await dataMapper.getAppointments();
			if (offers) {
				res.json(offers);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
};

export default get_controller;
