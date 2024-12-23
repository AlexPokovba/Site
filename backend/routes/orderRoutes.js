import { Router } from "express";

import {
 addOrderItems,
 getUserOrders,
 getOrderById,
 updateOrderToDelivered,
 getAllOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

export const orderRouter = Router();

orderRouter
 .route("/")
 .post(protect, addOrderItems)
 .get(protect, admin, getAllOrders);
orderRouter.route("/mine").get(protect, getUserOrders);
orderRouter.route("/:id").get(protect, getOrderById);
orderRouter.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
