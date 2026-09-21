import { z } from "zod";

const requestInformation = {
    firstName : z.string({ error: "First Name is required"}).min(3, "Min 3 letters required"),
    lastName : z.string({ error: "Last Name is required"}).min(1, "Min 1 letters required"),
    company : z.string({ error: "Company is required"}).min(1, "Min 1 letters required"),
    country : z.string({ error: "Country is required"}).min(1, "Min 1 letters required"),
    email : z.email({ error: "Email is required" }),
    mobileNo: z.string({ error: "Mobile No is required" }).regex(/^\d{10}$/, "Mobile No must contain exactly 10 digits"),
    productFamily : z.string({ error: "Product Family is required"}),
    productName : z.string({ error: "Product name is required"}),
    enquireType : z.string({ error: "Information Type is required"}),
    request : z.string().optional(),
};

export const CreateRequestInformationSchema = z.object(requestInformation);
export const UpdateRequestInformationSchema = CreateRequestInformationSchema.partial();

export type CreteRequestInformationSchemaType = z.infer<typeof CreateRequestInformationSchema>;
export type UpdateRequestInformationSchemaType = z.infer<typeof UpdateRequestInformationSchema>;