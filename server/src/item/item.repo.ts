import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Item, Prisma } from "@prisma/client";

@Injectable()
export class ItemRepo extends PrismaGenericRepo<Prisma.ItemCreateInput, Item> {
    constructor(private prismaService: PrismaService) {
        super('item', prismaService, { package: true })
    }
}