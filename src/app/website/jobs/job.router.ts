import { Router } from "express";
import { JobController } from "./job.controller";
import { ValidationMiddleware } from "../../../middlewares/validation.middleware";
import { CreateJobSchema } from "./dto/Job.dto";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";

const jobRouter = Router();

const jobController = new JobController();

jobRouter.post("/", AuthMiddleware.authenticate,ValidationMiddleware.validate(CreateJobSchema), jobController.create);
jobRouter.get("/", AuthMiddleware.authenticate, jobController.getByAll);
jobRouter.get("/:id", AuthMiddleware.authenticate, jobController.getById);
jobRouter.delete("/:id", AuthMiddleware.authenticate, jobController.delete);
jobRouter.put("/:id", AuthMiddleware.authenticate, jobController.update);

export default jobRouter;