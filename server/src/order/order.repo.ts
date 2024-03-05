import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Order, Prisma } from "@prisma/client";

@Injectable()
export class OrderRepo extends PrismaGenericRepo<Prisma.OrderCreateInput, Order> {
    constructor(private prismaService: PrismaService) {
        super('order', prismaService, { products: true })
    }


}