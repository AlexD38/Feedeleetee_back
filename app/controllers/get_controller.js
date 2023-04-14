import dataMapper from "../models/get_model.js";

const get_controller = {
	// changer await datamapper.blabla par getInfos
	async clientInformation(req, res) {
		try {
			const clientId = req.session.user.clientId;
			if (!clientId) {
				res.json({ failed: "client id is null" });
				return;
			}
			let client = await dataMapper.getOneClient(clientId);
			if (client) {
				res.json(client);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async clientsAppointments(req, res) {
		try {
			const clientId = req.params.id;
			let clientsAppointments = await dataMapper.getOneClientAppointments(
				clientId
			);
			if (clientsAppointments) {
				res.json(clientsAppointments);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async enterpriseClients(req, res) {
		try {
			const enterpriseId = req.session.user.enterpriseId;
			let enterpriseClients = await dataMapper.getclientsFromEnterprise(
				enterpriseId
			);
			if (enterpriseClients) {
				res.json(enterpriseClients);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
		const enterpriseId = req.session.user.enterpriseId;
	},
	async getAllInfosForMyEnterprise(req, res) {
		try {
			const enterpriseId = req.session.user.enterpriseId;
			const userId = req.session.user.user;
			console.log(enterpriseId, userId);
			let getAllInfosForMyEnterprise =
				await dataMapper.getAllInfosForMyEnterprise(
					userId,
					enterpriseId
				);
			if (getAllInfosForMyEnterprise) {
				console.log(getAllInfosForMyEnterprise);
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
			const id = req.params.id;
			let enterprises = await dataMapper.getEnterprises();
			if (enterprises) {
				res.json({
					enterprises,
				});
			} else {
				console.log("not ok");
			}
		} catch (error) {
			console.log(error);
		}
	},
	async oneEnterpriseInformation(req, res) {
		const enterpriseId = req.session.user.enterpriseId;
		try {
			let enterprise = await dataMapper.getOneEnterprise(enterpriseId);
			if (enterprise) {
				res.json(enterprise);
			} else {
				console.log("no enterprise found");
			}
		} catch (error) {
			console.log(error);
		}
	},
	async serviceInformationFromEnterprise(req, res) {
		try {
			const enterpriseId = req.session.user.enterpriseId;
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
	async appointmentInformationFromEnterprise(req, res) {
		try {
			const enterpriseId = req.session.user.enterpriseId;
			let appointments = await dataMapper.getAppointmentsFromEnterprise(
				enterpriseId
			);
			if (appointments) {
				res.json(appointments);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async appointmentsAvailableFromEnterprise(req, res) {
		try {
			const enterpriseId = req.params.id;
			console.log(req.params.id);
			// console.log("ici");
			let appointments =
				await dataMapper.getAppointmentsAvailableFromEnterprise(
					enterpriseId
				);
			if (appointments) {
				res.json(appointments);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
	async offerInformationFromEnterprise(req, res) {
		try {
			const enterpriseId = req.session.user.enterpriseId;
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
	// async appointmentInformation(req, res) {
	// 	try {
	// 		let offers = await dataMapper.getAppointments();
	// 		if (offers) {
	// 			res.json(offers);
	// 		} else {
	// 			console.log(error);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// },
	async getNextAppointments(req, res) {
		try {
			const enterpriseId = req.session.user.enterpriseId;

			let nextAppointments = await dataMapper.getNextAppointments(
				enterpriseId
			);
			if (nextAppointments) {
				res.json(nextAppointments);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
};

export default get_controller;
