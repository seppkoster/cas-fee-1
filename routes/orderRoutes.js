import express from "express";
const router = express.Router();
import { notesController } from "../controller/notesController";

router.get("/", notesController.getNotes.bind(notesController));
// router.post("/", ordersController.createPizza.bind(ordersController));
// router.get("/:id/", ordersController.showOrder.bind(ordersController));
// router.delete("/:id/", ordersController.deleteOrder.bind(ordersController));

export const notesRoutes = router;
