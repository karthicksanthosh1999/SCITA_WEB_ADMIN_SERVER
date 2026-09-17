import { z } from "zod";

export const createHashInformationSchema = z.object({
      productName: z.string().min(2, "Product name must contain at least 2 characters"),
      firmwareVersion: z.string().min(2, "Product name must contain at least 2 characters"),
      hashValue: z.string().min(2, "Product name must contain at least 2 characters"),
      userId: z.string("UserId is required"),
});

export const updateHashInformationSchema = z.object({
      productName: z.string().min(2, "Product name must contain at least 2 characters").optional(),
      firmwareVersion: z.string().min(2, "Product name must contain at least 2 characters").optional(),
      hashValue: z.string().min(2, "Product name must contain at least 2 characters").optional(),
      userId: z.string("UserId is required").optional(),
});

export type CreateHashInformationInput = z.infer<typeof createHashInformationSchema>;
export type UpdateHashInformationInput = z.infer<typeof updateHashInformationSchema>;