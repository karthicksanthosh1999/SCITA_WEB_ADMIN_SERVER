import express from "express";
import cors from "cors";

import { loggerMiddleware } from "./middlewares/logger.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import userRouter from "./app/users/user.router";
import authRoute from "./app/auth/auth.route";
import cookieParser from "cookie-parser";
import hashInformationRouter from "./app/website/hashInformation/hashInformation.router";
import contactRouter from "./app/website/contact/contact.router";
import requestInformationRoute from "./app/website/requestInformation/requestInformation.route";
import jobRouter from "./app/website/jobs/job.router";

export class App {
  public readonly app = express();

  constructor() {
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(cors({
      origin: "http://192.168.2.48:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(loggerMiddleware.handle);
  }
  
  private initializeRoutes() {
    this.app.get("/health", (_req, res) => {
      res.status(200).json({
        success: true,
        message: "Server is running",
      });
    });

    this.app.use("/api/users", userRouter);
    this.app.use("/api/auth", authRoute);
    this.app.use("/api/website/hashInformation", hashInformationRouter);
    this.app.use("/api/website/contact", contactRouter);
    this.app.use("/api/website/requestInformation", requestInformationRoute);
    this.app.use("/api/website/job", jobRouter);
  }

  private initializeErrorHandling() {
    this.app.use(notFoundMiddleware.handle);
    this.app.use(errorMiddleware.handle);
  }
}