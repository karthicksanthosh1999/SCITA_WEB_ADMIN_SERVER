import { Request, Response } from "express";
import { ContactService } from "./contact.service";
import { APIResponse } from "../../../lib/APIResponse";

export class ContactController {
    private readonly contactService: ContactService;

    constructor(){
        this.contactService = new ContactService();
    }

    create = async(req: Request, res: Response):Promise<void> => {
        const data = req.body;
        const contact = await this.contactService.create(data);
        res.status(200).json( new APIResponse("Contact Created Successfully", 201, contact))
    };

    findById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const { id } = req.params;
        const contact = await this.contactService.findById(id);

        res.status(200).json( new APIResponse("Contact Data Fetch Successfully", 200, contact));
    };

    delete = async (req: Request<{id: string}>, res: Response):Promise<void> => {
        const { id } = req.params;
        const contact = await this.contactService.delete(id);
        
        res.status(200).json( new APIResponse("Contact Deleted Successfully", 200, contact));
    };

    update = async (req: Request<{id: string}>, res: Response): Promise<void> => {
        const { id } = req.params;
        const data = req.body;
        const contact = await this.contactService.update(id, data);

        res.status(200).json( new APIResponse("Contact Updated Successfully", 200, contact));
    };

    findByAll = async(req: Request, res: Response): Promise<void> => {
        const data = req.body;
        const contact = await this.contactService.findByAll(data.page, data.limit);

        res.status(200).json( new APIResponse("Contact Fetch Successfully", 200, contact))
    };
}