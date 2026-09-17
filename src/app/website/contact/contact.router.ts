import { Router } from "express";
import { ContactController } from "./contact.controller";
import { ValidationMiddleware } from "../../../middlewares/validation.middleware";
import { createContactSchema, updateContactSchema } from "./dto/contactSchema";

const contactRouter = Router();

const contactController = new ContactController();

contactRouter.post('/',  ValidationMiddleware.validate(createContactSchema), contactController.create);
contactRouter.get("/", contactController.findByAll);
contactRouter.get("/:id", contactController.findById);
contactRouter.delete("/:id", contactController.delete);
contactRouter.put("/:id", ValidationMiddleware.validate(updateContactSchema), contactController.update);

export default contactRouter;