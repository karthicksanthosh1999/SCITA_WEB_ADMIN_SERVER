import { prisma } from "../../../db/prisma";
import { CreateJobSchemaType, UpdateJobSchemaType } from "./dto/Job.dto";
import { JobEntity } from "./job.entity";

export class JobRepository {
    public async create(data: CreateJobSchemaType):Promise<JobEntity> {
        const {topics, ...jobData} = data;

        return await prisma.job.create({
            data: {
                ...jobData,
                topics: {
                    create: topics.map((topic, idx) => ({
                        title : topic.title,
                        description: topic.description,
                        order: idx
                    })),
                },
            },
            include: {
                topics: {
                    orderBy: { order: "desc" }
                }
            }
        })
    };

    public async findByAll( page: number, limit: number):Promise<{ data: JobEntity[], total: number}> {
        const skip = (page - 1) * limit;
        const [jobData, total] = await Promise.all([
            prisma.job.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' }, include: { topics:{ orderBy: { createdAt: "desc" }} } }),
            prisma.job.count()
        ]);
        return {
            data: jobData,
            total
        };
    };

    public async findById(id: string):Promise<JobEntity | null> {
        return await prisma.job.findUnique({ where: {id}, include: { topics: { orderBy: { createdAt: "desc" } } } })
    };
    public async delete(id: string):Promise<JobEntity | null> {
        return await prisma.job.delete({ where: {id}, include: { topics: { orderBy: { createdAt: "desc" } } } })
    };

   public async update( id: string, data: UpdateJobSchemaType): Promise<JobEntity> {
    const { topics, ...jobData } = data;

    return await prisma.$transaction(async (tx) => {
      // Update Job fields
      await tx.job.update({ where: { id }, data: jobData});

      // Replace topics
      if (topics !== undefined) {
        await tx.jobTopic.deleteMany({
          where: { jobId: id }
        });

        await tx.jobTopic.createMany({
          data: topics.map((topic, idx) => ({
            jobId: id,
            title: topic.title,
            description: topic.description,
            order: idx,
          })),
        });
      }

      // Return updated Job
      return await tx.job.findUniqueOrThrow({
        where: { id },
        include: {
          topics: {
            orderBy: { order: "asc" },
          },
        },
      });
    });
 }
}