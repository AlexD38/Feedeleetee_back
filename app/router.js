import express from "express";
import delete_controller from "./controllers/delete_controller.js";
import get_controller from "./controllers/get_controller.js";
import patch_controller from "./controllers/patch_controller.js";
import post_controller from "./controllers/post_controller.js";
import authentication from "./middlewares/authMiddlewares/authentication.js";
// import signController from "./controllers/sign_controller.js";

const app = express();
const router = express.Router();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!! GET ROUTES !!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get(
	"/mydashboard",
	// authentication.verifyToken,
	get_controller.getAllInfosForMyEnterprise
);
router.get(
	"/clients/:id(\\d+)/appointments",
	// authentication.verifyToken,
	get_controller.clientsAppointments
);
router.get(
	"/enterprise/:id(\\d+)",
	// authentication.verifyToken,
	get_controller.oneEnterpriseInformation
);

router.get(
	"/enterprises",
	// authentication.verifyToken,
	get_controller.enterpriseInformation
);

router.get(
	"/enterprises/:id(\\d+)/services",
	// authentication.verifyToken,
	get_controller.serviceInformationFromEnterprise
);
router.get(
	"/enterprises/:id(\\d+)/clients",
	// authentication.verifyToken,
	get_controller.enterpriseClients
);
router.get(
	"/enterprises/:id(\\d+)/services/appointments",
	// authentication.verifyToken,
	get_controller.appointmentInformationFromServices
);
router.get(
	"/enterprises/:id(\\d+)/offers",
	// authentication.verifyToken,
	get_controller.offerInformationFromEnterprise
);

router.get(
	"/clients/:id(\\d+)",
	// authentication.verifyToken,
	get_controller.clientInformation
);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!! POST ROUTES!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post("/login", authentication.verifyUser, authentication.createToken);
router.post("/users", authentication.createUser);
router.post(
	"/enterprise",
	// authentication.verifyToken,
	post_controller.createEnterprise,
	post_controller.attachEnterpriseToUser
);
router.post(
	"/clients",
	// authentication.verifyToken,
	post_controller.createClient,
	post_controller.attachClientToUser
);

router.post(
	"/enterprises/:id(\\d+)/appointments",
	// authentication.verifyToken,
	post_controller.createAppointments
);
router.post(
	"/enterprises/:id(\\d+)/offers",
	// authentication.verifyToken,
	post_controller.createOffer
);
router.post(
	"/enterprises/:id(\\d+)/services",
	// authentication.verifyToken,
	post_controller.createService
);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!! PATCH ROUTES!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

router.patch(
	"/clients/appointments/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.insertClientIntoAppointment
);
router.patch(
	"/clients/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.updateClient
);
router.patch(
	"/enterprises/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.updateEnterprise
);
router.patch(
	"/appointments/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.updateAppointment
);
router.patch(
	"/appointments/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.updateAppointment
);
router.patch(
	"/services/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.updateService
);
router.patch(
	"/offers/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.updateOffer
);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!! DELETE ROUTES!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.delete(
	"/enterprises/:id(\\d+)",
	// authentication.verifyToken,
	delete_controller.deleteRecord
);
router.delete(
	"/clients/:id(\\d+)",
	// authentication.verifyToken,
	delete_controller.deleteRecord
);
router.delete(
	"/offers/:id(\\d+)",
	// authentication.verifyToken,
	delete_controller.deleteRecord
);
router.delete(
	"/services/:id(\\d+)",
	// authentication.verifyToken,
	delete_controller.deleteRecord
);
router.delete(
	"/enterprises/:id(\\d+)",
	// authentication.verifyToken,
	delete_controller.deleteRecord
);
router.delete(
	"/appointments/:id(\\d+)",
	// authentication.verifyToken,
	delete_controller.deleteRecord
);

export default router;
