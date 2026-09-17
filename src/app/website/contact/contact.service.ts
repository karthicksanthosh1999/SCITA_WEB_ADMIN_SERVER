import { ApiError } from "../../../lib/ApiError";
import { PaginationDto } from "../../../utils/paginationDto";
import { ContactEntity } from "./contact.entity";
import { ContactRepository } from "./contact.repository";
import { CreateContactDto } from "./dto/createContactDto";
import { UpdateContactDto } from "./dto/updateContactDto";

export class ContactService{
    private contactRepository: ContactRepository;
    constructor(){
        this.contactRepository = new ContactRepository();
    }

    async create(data: CreateContactDto):Promise<ContactEntity> {
        const contact = await this.contactRepository.create(data);

        return new ContactEntity(contact);
    };

    async findByAll(page: number, limit: number): Promise<PaginationDto<ContactEntity>> {
        const result = await this.contactRepository.findByAll(page, limit);
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

    async findById(id: string):Promise<ContactEntity> {
        const contact = await this.contactRepository.findById(id);
        if(!contact) throw new ApiError("Contact Not Found", 400);

        return new ContactEntity(contact);
    }

    async delete(id: string): Promise<ContactEntity> {
        const contact = await this.contactRepository.delete(id);
        if(!contact) throw new ApiError("Contact Not Found", 400);

        return new ContactEntity(contact);
    };

    async update(id: string, data: UpdateContactDto):Promise<ContactEntity> {
        const contact = await this.contactRepository.update(id, data);

        return new ContactEntity(contact);
    };
}