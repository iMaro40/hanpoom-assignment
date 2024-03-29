import express, { Application } from "express";
import { init } from "./init";
import { PORT } from "./config";

export async function startServer() {
  const app: Application = express();

  // Set up routes
  const { pickingSlipController } = await init();
  app.use("/api/picking-slips", pickingSlipController.getRouter());

  const server = app.listen(PORT, () => {
    console.log(`Server started on ${PORT}!`);
  });

  return { app, server };
}
