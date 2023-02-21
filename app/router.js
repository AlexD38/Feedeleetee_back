import express from "express";
import delete_controller from "./controllers/delete_controller.js";
import get_controller from "./controllers/get_controller.js";
import patch_controller from "./controllers/patch_controller.js";
import post_controller from "./controllers/post_controller.js";
import signController from "./controllers/sign_controller.js";
// import signController from "./controllers/sign_controller.js";

const app = express();
const router = express.Router();

//* GET ROUTES
router.get("/clients", get_controller.clientsInformation);
router.get("/enterprises", get_controller.enterpriseInformation);
router.get("/appointments", get_controller.appointmentInformation);
router.get("/offers", get_controller.offerInformation);
router.get("/services", get_controller.serviceInformation);

//* POST ROUTES
router.post("/signin", signController.verifyUser);
router.post("/clients", post_controller.createClient);
router.post("/enterprises", post_controller.createEnterprise);
router.post("/appointments", post_controller.createAppointments);
router.post("/offers", post_controller.createOffer);
router.post("/services", post_controller.createService);

//* PATCH ROUTES
router.patch("/clients/:id(\\d+)", patch_controller.updateClient);
router.patch("/enterprises/:id(\\d+)", patch_controller.updateEnterprise);
router.patch("/appointments/:id(\\d+)", patch_controller.updateAppointment);
router.patch("/offers/:id(\\d+)", patch_controller.updateOffer);
router.patch("/services/:id(\\d+)", patch_controller.updateService);

//* DELETE ROUTES
router.delete("/clients/:id(\\d+)", delete_controller.deleteRecord);
router.delete("/enterprises/:id(\\d+)", delete_controller.deleteRecord);
router.delete("/appointments/:id(\\d+)", delete_controller.deleteRecord);
router.delete("/offers/:id(\\d+)", delete_controller.deleteRecord);
router.delete("/services/:id(\\d+)", delete_controller.deleteRecord);

export default router;
