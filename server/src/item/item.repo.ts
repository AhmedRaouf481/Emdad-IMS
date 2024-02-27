import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Item, Prisma } from "@prisma/client";
import { CreateItemDto } from "./dto/create-item.dto";

@Injectable()
export class ItemRepo extends PrismaGenericRepo<Prisma.ItemCreateInput, Item> {
    constructor(private prismaService: PrismaService) {
        super('item', prismaService, { package: true })
    }
    async create_item(data: CreateItemDto) {
        try {
            const item = await this.prismaService.item.create({
                data: {
                    barcode: data.barcode,
                    productId: data.productId
                }
            })
            return item
        } catch (error) {
            throw error
        }
    }
}