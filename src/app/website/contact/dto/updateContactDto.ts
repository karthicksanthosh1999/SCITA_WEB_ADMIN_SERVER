export class UpdateContactDto{

    public firstName?:string;
    public surName?: string;
    public email?: string;
    public mobileNo?: string;

    constructor(data:{id:string, firstName?:string, surName?:string, email?:string, mobileNo?:string}){
        this.firstName = data.firstName;
        this.surName = data.surName;
        this.email = data.email;
        this.mobileNo = data.mobileNo
    }
}