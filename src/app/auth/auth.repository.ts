import { prisma } from "../../db/prisma";
import { UserEntity } from "../users/user.entity";

export class AuthRepository {
    async login(email: string):Promise<UserEntity | null>{
        const user = await prisma.user.findUnique( { where: { email } });

        if(!user) return null;

        return new UserEntity(user);
    };
};