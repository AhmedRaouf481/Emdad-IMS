import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Package, Prisma } from "@prisma/client";

@Injectable()
export class PackageRepo extends PrismaGenericRepo<Prisma.PackageCreateInput, Package> {
    constructor(private prismaService: PrismaService) {
        super('package', prismaService, { items: true })
    }

    // async createPkgWithItems(data: any) {
    //     const items: Prisma.ItemCreateInput[] = []
    //     for (let i = 0; i < data.qty; i++) {
    //         items.push(data.item)
    //     }
    //     try {
    //         const pkg = await this.prismaService.package.create({
    //             data: {
    //                 capacity: data.capacity,
    //                 items: {
    //                     createMany: {
    //                         data: items
    //                     }
    //                 },
    //             },
    //             include: this.includesObj as Prisma.PackageInclude
    //         })
    //         return pkg
    //     } catch (error) {
    //         throw error
    //     }
    // }

    async deleteAll() {

        try {
            const pkg = await this.prismaService.package.deleteMany({})
            return pkg
        } catch (error) {
            throw error
        }
    }


}