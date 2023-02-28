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
	async getAllInfosForMyEnterprise(req, res) {
		try {
			// const userId = req.header.token.userId;
			let userId = 1;
			let getAllInfosForMyEnterprise =
				await dataMapper.getAllInfosForMyEnterprise(userId);
			if (getAllInfosForMyEnterprise) {
				res.json(getAllInfosForMyEnterprise);
			}
		} catch (error) {
			res.status(500).send({
				message: "I can't give you that information right now...",
				statusCode: 500,
			});
			console.log(error);
		}
	},
	async enterpriseInformation(req, res) {
		try {
			let enterprises = await dataMapper.getEnterprises();
			if (enterprises) {
				res.json(enterprises);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async oneEnterpriseInformation(req, res) {
		const enterpriseId = req.params.id;
		try {
			let enterprise = await dataMapper.getOneEnterprise(enterpriseId);
			if (enterprise) {
				res.json(enterprise);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async serviceInformationFromEnterprise(req, res) {
		try {
			const enterpriseId = req.params.id;
			let services = await dataMapper.getServicesFromEnterprise(
				enterpriseId
			);
			if (services) {
				res.json(services);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async appointmentInformationFromServices(req, res) {
		try {
			const enterpriseId = req.params.id;
			let services = await dataMapper.getAppointmentsFromServices(
				enterpriseId
			);
			if (services) {
				res.json(services);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async offerInformationFromEnterprise(req, res) {
		try {
			const enterpriseId = req.params.id;
			let offers = await dataMapper.getOffersFromEnterprises(
				enterpriseId
			);
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
