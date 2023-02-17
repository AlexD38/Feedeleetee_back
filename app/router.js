import express from "express";
import get_controller from "./controllers/get_controller.js";
import post_controller from "./controllers/post_controller.js";

const app = express();
const router = express.Router();

// GET ROUTES
router.get("/clients", get_controller.clientsInformation);
router.get("/enterprises", get_controller.enterpriseInformation);
router.get("/appointments", get_controller.appointmentInformation);
router.get("/offers", get_controller.offerInformation);
router.get("/services", get_controller.serviceInformation);

// POST ROUTES

router.post("/clients", post_controller.createClient);
router.post("/enterprises", post_controller.createEnterprise);
router.post("/appointments", post_controller.createAppointments);
router.post("/offers", post_controller.createOffer);

// PATCH ROUTES

// DELETE ROUTES

export default router;
