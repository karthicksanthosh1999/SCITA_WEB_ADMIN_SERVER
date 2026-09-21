import { prisma } from "../../../db/prisma";
import { CreteRequestInformationSchemaType, UpdateRequestInformationSchemaType } from "./dto/requestInformation";
import { RequestInformationEntity } from "./requestInformation.entity";

export class RequestInformationRepository {

    async create(data: CreteRequestInformationSchemaType): Promise<RequestInformationEntity> {
        return await prisma.requiredInformation.create({data})
    };

    async findByAll(page: number, limit: number): Promise<{ data: RequestInformationEntity[], total: number}> {
        const skip = (page - 1) * limit;
        const [requestInformationData,total] = await Promise.all([
            prisma.requiredInformation.findMany({ skip, take: limit, orderBy: { createdAt: "desc" }}),
            prisma.requiredInformation.count()
        ]);
        return {
            data: requestInformationData,
            total: total
        };
    };

    async findById(id: string):Promise<RequestInformationEntity | null> {
        return await prisma.requiredInformation.findUnique({ where: { id } })
    };

    async delete(id: string):Promise<RequestInformationEntity | null> {
        return await prisma.requiredInformation.delete({ where: { id }})
    };

    async updata(id: string, data: UpdateRequestInformationSchemaType):Promise<RequestInformationEntity> {
        return await prisma.requiredInformation.update({ where: {id}, data })
    };

}