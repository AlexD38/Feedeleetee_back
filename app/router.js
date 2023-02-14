import express from "express";
import controller from "./controller/controller.js";

const app = express();
const router = express.Router();

router.get("/", controller.clientsInformation);

export default router;
