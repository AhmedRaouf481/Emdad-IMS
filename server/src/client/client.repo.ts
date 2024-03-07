import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Client, Prisma } from "@prisma/client";

@Injectable()
export class ClientRepo extends PrismaGenericRepo<Prisma.ClientCreateInput, Client> {
    constructor(private prismaService: PrismaService) {
        super('client', prismaService)
    }


}