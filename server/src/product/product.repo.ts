import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Product, Prisma } from "@prisma/client";

@Injectable()
export class ProductRepo extends PrismaGenericRepo<Prisma.ProductCreateInput, Product> {
    constructor(private prismaService: PrismaService) {
        super('product', prismaService, { packages: { include: { items: true } } })
    }

    async createFromExcel(data: Prisma.ProductCreateInput[]) {
        try {
            data.forEach(async (prod) => {
                const product = await this.prismaService.product.upsert({
                    where: { code: prod.code },
                    create: {
                        ...prod
                    },
                    update: {
                        qty: { increment: prod.qty },
                        price: prod.price,
                        pkgCapacity: prod.pkgCapacity
                    }
                })
                if (prod.qty !== 0) {
                    const pkgData: { barcode: string, productId: string, capacity: number }[] = []
                    let numOfPkgs = Math.ceil(prod.qty / prod.pkgCapacity)
                    for (let i = 0; i < numOfPkgs; i++) {
                        let barcode = (Math.random() * 10).toString()
                        pkgData.push({ barcode, productId: product.id, capacity: product.pkgCapacity })
                    }
                    await this.prismaService.package.createMany({
                        data: pkgData
                    })
                    let pkgBarcodes = pkgData.map((p) => p.barcode)

                    const pkgs = await this.prismaService.package.findMany({
                        where: {
                            barcode: { in: pkgBarcodes }
                        }
                    })

                    let itemsPerPkg = prod.pkgCapacity
                    pkgs.forEach(async (pkg, index) => {
                        if (index === pkgs.length - 1) {
                            itemsPerPkg = prod.qty % prod.pkgCapacity === 0 ? itemsPerPkg : prod.qty % prod.pkgCapacity
                        }
                        let itemsData = []
                        for (let i = 0; i < itemsPerPkg; i++) {
                            let barcode = (Math.random() * 10).toString()
                            itemsData.push({ barcode, productId: product.id, packageId: pkg.id })
                        }
                        await this.prismaService.item.createMany({
                            data: itemsData
                        })

                    })

                }
            }
            )
            return "ok"
        } catch (error) {
            throw error
        }
    }

    async createMany(data: Prisma.ProductCreateInput[]) {
        try {

            const products = await this.prismaService.product.createMany({
                data
            })

            return products
        } catch (error) {
            throw error
        }
    }


    async deleteMany() {
        try {

            const products = await this.prismaService.product.deleteMany({})

            return products
        } catch (error) {
            throw error
        }
    }

}