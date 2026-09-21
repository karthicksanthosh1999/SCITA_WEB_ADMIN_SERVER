import { ApiError } from "../../../lib/ApiError";
import { PaginationDto } from "../../../utils/paginationDto";
import { CreteRequestInformationSchemaType, UpdateRequestInformationSchemaType } from "./dto/requestInformation";
import { RequestInformationEntity } from "./requestInformation.entity";
import { RequestInformationRepository } from "./requestInformation.repository";

export class RequestInformationService {
    private readonly requestInformationRepository: RequestInformationRepository;
    constructor(){
        this.requestInformationRepository = new RequestInformationRepository();
    }

    public async create(data: CreteRequestInformationSchemaType):Promise<RequestInformationEntity> {
        const requestInformation = await this.requestInformationRepository.create(data);
        return new RequestInformationEntity(requestInformation);
    };

    public async findByAll(page: number, limit: number):Promise<PaginationDto<RequestInformationEntity>> {
        const result = await this.requestInformationRepository.findByAll(page, limit);
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

    public async findById(id: string):Promise<RequestInformationEntity> {
        const result = await this.requestInformationRepository.findById(id);
        if(!result) throw new ApiError("Information not found", 400);

        return new RequestInformationEntity(result);
    };

    public async delete(id: string):Promise<RequestInformationEntity> {
        const result = await this.requestInformationRepository.delete(id);
        if(!result) throw new ApiError("Information Not Found", 400);

        return new RequestInformationEntity(result);
    };

    public async update (id :string, data: UpdateRequestInformationSchemaType):Promise<RequestInformationEntity> {
        const result = await this.requestInformationRepository.updata(id, data);
        
        return new RequestInformationEntity(result);
    } 
}