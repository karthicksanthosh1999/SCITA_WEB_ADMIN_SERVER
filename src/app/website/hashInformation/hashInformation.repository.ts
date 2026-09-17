import { prisma } from "../../../db/prisma";
import { CreateHashInformationDto } from "./dto/CreateHashInformationDto";
import { UpdateHashInformationDto } from "./dto/UpdateHashInformationDto";
import { HashInformationEntity } from "./hashInformation.entity";

export class HashInformationRepository {
    async create(userId: string, data: CreateHashInformationDto):Promise<HashInformationEntity>{
        const hashInformation = await prisma.hashInformation.create({data : { ...data, userId }});
        return new HashInformationEntity(hashInformation);
    };
    async findAll(userId: string): Promise<HashInformationEntity[]> {
        const hashInformation = await prisma.hashInformation.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
            return hashInformation.map(item=> new HashInformationEntity(item));
    };
    async findById(userId: string, id: string): Promise<HashInformationEntity | null> {
        const hashInformation = await prisma.hashInformation.findFirst({ where: { id , userId}});
        if (!hashInformation) return null;
        return new HashInformationEntity(hashInformation);
    };
    async delete(userId: string, id: string): Promise<HashInformationEntity | null> {
        const hashInformation = await prisma.hashInformation.delete({ where: { id, userId}});
        if (!hashInformation) return null;
        return new HashInformationEntity(hashInformation);
    };
    async update(userId: string, id: string, data: UpdateHashInformationDto): Promise<HashInformationEntity | null> {
        const hashInformation = await prisma.hashInformation.update({ where: {id, userId}, data  });
        if (!hashInformation) return null;
        return new HashInformationEntity(hashInformation);
    };
};