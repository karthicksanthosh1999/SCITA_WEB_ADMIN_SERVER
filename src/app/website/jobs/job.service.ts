import { ApiError } from "../../../lib/ApiError";
import { PaginationDto } from "../../../utils/paginationDto";
import { CreateJobSchemaType, UpdateJobSchemaType } from "./dto/Job.dto";
import { JobEntity } from "./job.entity";
import { JobRepository } from "./job.repository";

export class JobService {
    private readonly jobRepository: JobRepository; 
    constructor(){
        this.jobRepository = new JobRepository()
    };

    async create(data: CreateJobSchemaType): Promise<JobEntity> {
        const result = await this.jobRepository.create(data);
        return new JobEntity(result);
    };

    async findByAll(page: number, limit: number):Promise<PaginationDto<JobEntity>> {
        const result = await this.jobRepository.findByAll(page, limit);
        const totalPages = Math.ceil(result.total / limit);
        return {
           data: result.data,
           pagination: {
            page,
            limit,
            total: result.total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
           }
        }
    };

    async findById(id: string):Promise<JobEntity> {
        const result = await this.jobRepository.findById(id);
        if(!result) throw new ApiError("Job not found", 404)
        return new JobEntity(result);
    };

    async delete(id: string):Promise<JobEntity> {
        const result = await this.jobRepository.delete(id);
        if(!result) throw new ApiError("Job not found", 404)
        return new JobEntity(result);
    };

    async update(id: string, data: UpdateJobSchemaType):Promise<JobEntity> {
        const result = await this.jobRepository.update(id, data);
        if(!result) throw new ApiError("Job not found", 404)
        return new JobEntity(result);
    };

}