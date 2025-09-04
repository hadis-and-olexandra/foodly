import express from "express";
import { getAllCuisines } from "../controllers/countryController.js";

const router = express.Router();

router.get("/", getAllCuisines);

export default router;
