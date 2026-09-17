import { ApiError } from "../../../lib/ApiError";
import { CloudinaryService } from "../../../lib/cloudinary.service";
import { CreateHashInformationDto } from "./dto/CreateHashInformationDto";
import { UpdateHashInformationDto } from "./dto/UpdateHashInformationDto";
import { HashInformationEntity } from "./hashInformation.entity";
import { HashInformationRepository } from "./hashInformation.repository";

export class HashInformationService {
  private readonly hashInformationRepository: HashInformationRepository;
  private readonly cloudinaryService: CloudinaryService;

  constructor() {
    this.hashInformationRepository = new HashInformationRepository();
    this.cloudinaryService = new CloudinaryService();
  }

    async create( userId: string, data: CreateHashInformationDto, image?: Express.Multer.File ): Promise<HashInformationEntity> {
    let uploadedImage;

    if (image) uploadedImage = await this.cloudinaryService.upload(image, "hash-information");
    
        try {
            return await this.hashInformationRepository.create(userId, {
                ...data,
                productImageUrl: uploadedImage?.url ?? null,
                productImagePublicId: uploadedImage?.publicId ?? null,
            });
        } catch (error) {
            if (uploadedImage?.publicId) {
            await this.cloudinaryService.delete(uploadedImage.publicId);
            }
            throw error;
        }
    };

  async findAll(userId: string): Promise<HashInformationEntity[]> {
    return await this.hashInformationRepository.findAll(userId);
  };

  async findById(
    userId: string,
    id: string,
  ): Promise<HashInformationEntity> {
    const hashInformation =
      await this.hashInformationRepository.findById(userId, id);

    if (!hashInformation) {
      throw new ApiError("Hash Information Not Found", 404);
    }

    return hashInformation;
  }

    async delete( userId: string, id: string ): Promise<HashInformationEntity> {
    // 1. Get the record first
    const hashInformation = await this.hashInformationRepository.findById(userId, id);
    if (!hashInformation) {
        throw new ApiError("Hash Information Not Found", 404);
    }

    // 2. Delete database record
    const deletedHashInformation = await this.hashInformationRepository.delete(userId, id);

    if (!deletedHashInformation) {
        throw new ApiError("Hash Information Not Found", 404);
    }

    // 3. Delete image from Cloudinary
    if (hashInformation.productImagePublicId) {
        await this.cloudinaryService.delete(
        hashInformation.productImagePublicId,
        );
    }

    return deletedHashInformation;
    }

  async update(
    userId: string,
    id: string,
    data: UpdateHashInformationDto,
  ): Promise<HashInformationEntity> {
    const hashInformation =
      await this.hashInformationRepository.update(userId, id, data);

    if (!hashInformation) {
      throw new ApiError("Hash Information Not Found", 404);
    }

    return hashInformation;
  }
}