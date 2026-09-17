export class CreateHashInformationDto {
    productImageUrl: string | null;
    productImagePublicId: string | null;
    productName: string;
    firmwareVersion: string;
    hashValue: string;
    userId: string;

    constructor(
        data: {
            productImageUrl: string | null,
            productImagePublicId: string | null,
            productName: string,
            firmwareVersion: string,
            hashValue: string
            userId: string
        }
    ){
        this.productImageUrl = data.productImageUrl;
        this.productImagePublicId = data.productImagePublicId;
        this.productName = data.productName;
        this.firmwareVersion = data.firmwareVersion;
        this.hashValue = data.hashValue;
        this.userId = data.userId;
    }
}