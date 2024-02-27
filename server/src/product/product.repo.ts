import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Product, Prisma } from "@prisma/client";

@Injectable()
export class ProductRepo extends PrismaGenericRepo<Prisma.ProductCreateInput, Product> {
    constructor(private prismaService: PrismaService) {
        super('product', prismaService, { package: true })
    }

    async createMany(data: Prisma.ProductCreateInput[]) {
        try {
            const products = await this.prismaService.product.createMany({
                data,
            })
            return products
        } catch (error) {
            throw error
        }
    }
}