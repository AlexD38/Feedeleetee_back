import express from "express";
import delete_controller from "./controllers/delete_controller.js";
import get_controller from "./controllers/get_controller.js";
import patch_controller from "./controllers/patch_controller.js";
import post_controller from "./controllers/post_controller.js";
import authentication from "./middlewares/authMiddlewares/authentication.js";
// import signController from "./controllers/sign_controller.js";

const app = express();
const router = express.Router();

//! SUPER ADMIN ROUTES

// //* GET ROUTES
// router.get("/clients", get_controller.clientsInformation);
// router.get("/enterprises", get_controller.enterpriseInformation);
// router.get("/appointments", get_controller.appointmentInformation);
// router.get("/offers", get_controller.offerInformation);
// router.get("/services", get_controller.serviceInformation);

// //* POST ROUTES
// router.post("/signin", loginController.verifyUser);
// router.post("/clients", post_controller.createClient);
// router.post("/enterprises", post_controller.createEnterprise);
// router.post("/appointments", post_controller.createAppointments);
// router.post("/offers", post_controller.createOffer);
// router.post("/services", post_controller.createService);

// //* PATCH ROUTES
// router.patch("/clients/:id(\\d+)", patch_controller.updateClient);
// router.patch("/enterprises/:id(\\d+)", patch_controller.updateEnterprise);
// router.patch("/appointments/:id(\\d+)", patch_controller.updateAppointment);
// router.patch("/offers/:id(\\d+)", patch_controller.updateOffer);
// router.patch("/services/:id(\\d+)", patch_controller.updateService);

// //* DELETE ROUTES
// router.delete("/clients/:id(\\d+)", delete_controller.deleteRecord);
// router.delete("/enterprises/:id(\\d+)", delete_controller.deleteRecord);
// router.delete("/appointments/:id(\\d+)", delete_controller.deleteRecord);
// router.delete("/offers/:id(\\d+)", delete_controller.deleteRecord);
// router.delete("/services/:id(\\d+)", delete_controller.deleteRecord);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!! GET ROUTES!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get(
	"/mydashboard",
	// authentication.verifyToken,
	get_controller.getAllInfosForMyEnterprise
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
	"/enterprises/:id(\\d+)",
	// authentication.verifyToken,
	get_controller.oneEnterpriseInformation
);
router.get(
	"/enterprises/:id(\\d+)/services",
	// authentication.verifyToken,
	get_controller.serviceInformationFromEnterprise
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
router.post("/signup", authentication.createUser, authentication.createToken);
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

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!! PATCH ROUTES!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

router.patch(
	"/appointments/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.insertClientIntoAppointment
);
router.patch(
	"/clients/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.updateClient
);
router.patch(
	"/appointments/:id(\\d+)",
	// authentication.verifyToken,
	patch_controller.insertClientIntoAppointment
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

export default router;
