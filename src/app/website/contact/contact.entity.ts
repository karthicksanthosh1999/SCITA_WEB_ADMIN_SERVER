export class ContactEntity{
    public id: string;
    public firstName:string;
    public surName: string;
    public email: string;
    public mobileNo: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(data:{id:string, firstName:string, surName:string, email:string, mobileNo:string, createdAt: Date;
        updatedAt: Date}){
        this.id = data.id;
        this.firstName = data.firstName;
        this.surName = data.surName;
        this.email = data.email;
        this.mobileNo = data.mobileNo;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}