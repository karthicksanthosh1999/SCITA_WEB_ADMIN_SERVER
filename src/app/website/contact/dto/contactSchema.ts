import { z } from "zod";

export const createContactSchema = z.object({
    firstName : z.string({ error: "FirstName is required" }).min(3, "Min 3 number is required"),
    surName : z.string({ error: "SurName is required" }),
    email : z.email({ error: "Email is required" }),
    mobileNo: z.string({ error : "Mobile No is required"}).min(10, "Min 10 number is required").max(10, "Max 10 number is required")
});

export const updateContactSchema = z.object({
    firstName : z.string().optional(),
    surName : z.string().optional(),
    email : z.email().optional(),
    mobileNo: z.string({ error : "Mobile No is required"}).optional()
});



