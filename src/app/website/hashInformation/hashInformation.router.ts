import { Router } from "express";
import { HashInformationController } from "./hashInformation.controller";
import { ValidationMiddleware } from "../../../middlewares/validation.middleware";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
import { updateHashInformationSchema, createHashInformationSchema } from "./hashInformation.schema";
import { uploadImage } from "../../../lib/UploadImage";

const hashInformationRouter = Router();

const hashInformationController = new HashInformationController();

hashInformationRouter.post('/',  AuthMiddleware.authenticate, uploadImage.single("productImage"), ValidationMiddleware.validate(createHashInformationSchema), hashInformationController.create);
hashInformationRouter.get('/', AuthMiddleware.authenticate, hashInformationController.getAll);
hashInformationRouter.get('/:id', AuthMiddleware.authenticate, hashInformationController.getById);
hashInformationRouter.delete('/:id', AuthMiddleware.authenticate, hashInformationController.delete);
hashInformationRouter.put('/:id', AuthMiddleware.authenticate, ValidationMiddleware.validate(updateHashInformationSchema), hashInformationController.delete);


export default hashInformationRouter;