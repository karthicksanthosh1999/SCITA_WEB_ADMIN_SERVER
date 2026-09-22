import { Request, Response } from "express";
import { RequestInformationService } from "./requestInformation.service";
import { APIResponse } from "../../../lib/APIResponse";

export class RequestInformationController{
    private readonly requestInformationService: RequestInformationService;
    constructor(){
        this.requestInformationService = new RequestInformationService();
    }

    public create = async (req: Request, res: Response):Promise<void> => {
        const data = req.body;
        const result = await this.requestInformationService.create(data);
        res.status(201).json( new APIResponse("Information Created Successfully", 201, result));
    };

    public findByAll = async(req:Request, res: Response):Promise<void> => {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);    
        const result = await this.requestInformationService.findByAll(page, limit);
        res.status(200).json( new APIResponse("Request Information Created Successfully", 201, result))
    };

    public findById = async(req: Request<{ id: string}>, res: Response):Promise<void> => {
        const {id} = req.params;
        const result = await this.requestInformationService.findById(id);
        res.status(200).json( new APIResponse("Request Information Fetch Successfully", 200, result))
    };

    public delete = async(req: Request<{ id: string}>, res: Response):Promise<void> => {
        const {id} = req.params;
        const result = await this.requestInformationService.delete(id);
        res.status(200).json( new APIResponse("Request Information Deleted Successfully", 200, result))
    };

    public update = async(req: Request<{id: string}>, res: Response):Promise<void> => {
        const { id } = req.params;
        const data = req.body;
        const result = await this.requestInformationService.update(id, data);
        res.status(200).json( new APIResponse("Request Information Update Successfully", 200, result));
    };
}