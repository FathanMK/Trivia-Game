import express from "express";
import AppDataSource from "./AppDataSource";
import { paymentRoutes } from "./routes";

const app = express();

AppDataSource.initialize().then(() => {
  app.use(express.json());
  app.use("/api/v1", paymentRoutes);
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
