import { z } from "zod";

const jobValidation = {
    title: z.string().min(2, "Job title must be at least 2 characters"),
    overview: z.string().min(10, "Overview must be at least 10 characters"),
      topics: z
    .array(
      z.object({
        title: z
          .string()
          .min(1, "Topic title is required"),

        description: z
          .string()
          .min(1, "Topic description is required"),

        order: z.number().optional(),
      }),
    )
    .default([]),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    mobileNo: z.string().optional().or(z.literal("")),
}

export const CreateJobSchema = z.object(jobValidation);
export const UpdateJobSchema = CreateJobSchema.partial();

export type CreateJobSchemaType = z.infer<typeof CreateJobSchema>;
export type UpdateJobSchemaType = z.infer<typeof UpdateJobSchema>;