import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UserRepo extends PrismaGenericRepo<User> {
    constructor(private prismaService: PrismaService) {
        super('user', prismaService)
    }
}