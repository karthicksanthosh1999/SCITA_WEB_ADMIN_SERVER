import { Router } from "express";
import { RequestInformationController } from "./requestInformation.controller";
import { ValidationMiddleware } from "../../../middlewares/validation.middleware";
import { CreateRequestInformationSchema, UpdateRequestInformationSchema } from "./dto/requestInformation";

const requestInformationRoute = Router();

const requestInformationController = new RequestInformationController();

requestInformationRoute.post('/', ValidationMiddleware.validate(CreateRequestInformationSchema),requestInformationController.create);
requestInformationRoute.get('/', requestInformationController.findByAll);
requestInformationRoute.get('/:id', requestInformationController.findById);
requestInformationRoute.delete('/:id', requestInformationController.delete);
requestInformationRoute.put('/:id', ValidationMiddleware.validate(UpdateRequestInformationSchema), requestInformationController.update);

export default requestInformationRoute;

