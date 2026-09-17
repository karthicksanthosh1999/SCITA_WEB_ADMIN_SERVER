import { Request, Response } from "express";
import { HashInformationService } from "./hashInformation.service";
import { APIResponse } from "../../../lib/APIResponse";

export class HashInformationController {
    private readonly hashInformationService: HashInformationService;

    constructor(){
        this.hashInformationService = new HashInformationService();
    }

    create = async(req: Request, res: Response): Promise<void> => {
        const data = req.body;
        const { id: userId } = req.user!;

        const hashInformation = await this.hashInformationService.create(userId, data, data?.productImage);

        res.status(201).json( new APIResponse("Hash Information Created Successfully", 201, hashInformation));
    };

    getAll = async(req: Request, res: Response): Promise<void> => {
        const { id: userId } = req.user!;

        const hashInformation = await this.hashInformationService.findAll(userId);

        res.status(200).json( new APIResponse("Hash Information Fetched Successfully", 200, hashInformation));
    };

    getById = async(req: Request<{id: string}>, res: Response): Promise<void> => {
        const { id: userId } = req.user!;
        const { id } = req.params;
        
        const hashInformation = await this.hashInformationService.findById(userId,id);

        res.status(200).json( new APIResponse("Hash Information Fetched Successfully", 200, hashInformation));
    };

    delete = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
        const { id: userId } = req.user!;
        const { id } = req.params;

        const hashInformation = await this.hashInformationService.delete(userId, id);

        res.status(200).json( new APIResponse("Hash Information Deleted Successfully", 200, hashInformation));
    };

    update = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
        const { id: userId } = req.user!;
        const { id } = req.params;
        const data = req.body;

        const hashInformation = await this.hashInformationService.update(userId, id, data);

        res.status(200).json( new APIResponse("Hash Information Updated Successfully", 200, hashInformation));
    };
}