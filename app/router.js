import express from "express";
import controller from "./controller/controller.js";

const app = express();
const router = express.Router();

// GET ROUTES
router.get("/clients", controller.clientsInformation);
router.get("/enterprises", controller.enterpriseInformation);
router.get("/appointments", controller.appointmentInformation);
router.get("/offers", controller.offerInformation);
router.get("/services", controller.serviceInformation);

// POST ROUTES

// PATCH ROUTES

// DELETE ROUTES

export default router;
