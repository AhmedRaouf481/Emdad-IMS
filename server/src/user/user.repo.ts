import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UserRepo extends PrismaGenericRepo<Prisma.UserCreateInput, User> {
    constructor(private prismaService: PrismaService) {
        super('user', prismaService)
    }

    async getByEmail(email: string) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: { email }
            })
            return user
        } catch (error) {
            throw error
        }
    }
}