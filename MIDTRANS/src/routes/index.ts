import express from "express";
import PaymentController from "../controller/Payment.controller";

const paymentRoutes = express.Router();

paymentRoutes.post("/payment", PaymentController.payment);
paymentRoutes.post("/midtrans-callback", PaymentController.midtransCallback);

export { paymentRoutes };
