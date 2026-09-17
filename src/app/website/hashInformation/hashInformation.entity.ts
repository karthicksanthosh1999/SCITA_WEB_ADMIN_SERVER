export class HashInformationEntity {
    id: string;
    productImageUrl: string | null;
    productImagePublicId: string | null;
    productName: string;
    firmwareVersion: string;
    hashValue: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(data: {
        id: string;
        productImageUrl: string | null;
        productImagePublicId: string | null;
        productName: string;
        firmwareVersion: string;
        hashValue: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = data.id;
        this.productImageUrl = data.productImageUrl;
        this.productImagePublicId = data.productImagePublicId;
        this.productName = data.productName;
        this.firmwareVersion = data.firmwareVersion;
        this.hashValue = data.hashValue;
        this.userId = data.userId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}