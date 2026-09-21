import { Request, Response } from "express";
import { JobService } from "./job.service";
import { APIResponse } from "../../../lib/APIResponse";

export class JobController{
    private readonly jobService: JobService;
    constructor(){
        this.jobService = new JobService();
    }

    public create = async(req: Request, res: Response):Promise<void> => {
        const data = req.body;
        const result = await this.jobService.create(data);
        res.status(200).json(new APIResponse("Job Created Successfully", 201, result))
    };

    public getByAll = async(req: Request, res: Response):Promise<void> => {
        const data = req.body;
        const result = await this.jobService.findByAll(data.page, data.limit);
        res.status(200).json(new APIResponse("Job Fetched Successfully", 200, result))
    };

    public getById = async(req: Request<{ id: string }>, res: Response):Promise<void> => {
        const { id } = req.params;
        const result = await this.jobService.findById(id);
        res.status(200).json(new APIResponse("Job Fetched Successfully", 200, result))
    };

    public delete = async(req: Request<{ id: string }>, res: Response):Promise<void> => {
        const { id } = req.params;
        const result = await this.jobService.delete(id);
        res.status(200).json(new APIResponse("Job Deleted Successfully", 200, result));
    };

    public update = async(req: Request<{ id: string }>, res: Response):Promise<void> => {
        const { id } = req.params;
        const data = req.body;
        const result = await this.jobService.update(id, data);
        res.status(200).json(new APIResponse("Job Updated Successfully", 200, result));
    };
}