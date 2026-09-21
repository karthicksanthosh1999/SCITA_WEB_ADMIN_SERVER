export class RequestInformationEntity {
    public firstName: string;
    public lastName: string;
    public company: string;
    public country: string;
    public email: string;
    public mobileNo: string;
    public productFamily: string;
    public productName: string;
    public enquireType: string;
    public request: string | null;

    constructor(
        data: {
        firstName: string,
        lastName: string,
        company: string,
        country: string,
        email: string,
        mobileNo: string,
        productFamily: string,
        productName: string,
        enquireType: string,
        request: string | null,
        }
    ){
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.company = data.company
        this.country = data.country
        this.email = data.email
        this.mobileNo = data.mobileNo
        this.productFamily = data.productFamily
        this.productName = data.productName
        this.enquireType = data.enquireType
        this.request = data.request
    }
}