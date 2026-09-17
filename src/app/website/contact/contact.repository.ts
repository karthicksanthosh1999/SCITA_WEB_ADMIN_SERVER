import { prisma } from "../../../db/prisma";
import { ContactEntity } from "./contact.entity";
import { CreateContactDto } from "./dto/createContactDto";
import { UpdateContactDto } from "./dto/updateContactDto";

export class ContactRepository {
    async create(data: CreateContactDto):Promise<ContactEntity> {
        return await prisma.contact.create({ data });
    };

    async findByAll(page: number,limit: number): Promise<{ data: ContactEntity[], total: number}>{
        const skip = (page -1) * limit;

        const [contactData, count] = await Promise.all([
            prisma.contact.findMany({ skip, take: limit, orderBy:{ createdAt: "desc" } }),
            prisma.contact.count()
        ]);

        return {
            data: contactData,
            total: count
        };
    };

    async findById(id:string):Promise<ContactEntity | null>{
        return await prisma.contact.findUnique({ where: { id } })
    };

    async delete(id: string): Promise<ContactEntity | null> {
        return await prisma.contact.delete({ where: { id }})
    };

    async update(id: string, data: UpdateContactDto): Promise<ContactEntity> {
        return await prisma.contact.update({ where: {id}, data });
    };
}