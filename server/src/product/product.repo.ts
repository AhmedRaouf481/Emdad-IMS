import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Product, Prisma } from "@prisma/client";
interface CustomProductWhereInput extends Prisma.ProductWhereInput {
    [key: string]: any; // Allow dynamic property assignment
}

@Injectable()
export class ProductRepo extends PrismaGenericRepo<Prisma.ProductCreateInput, Product> {
    constructor(private prismaService: PrismaService) {
        super('product', prismaService)
    }

    pagination(params: { limit: number, page: number, total: number }): {
        offset?: number
        current?: number
        limit?: number
        total?: number
        pages: number
    } {
        if (params.limit <= 0) {
            throw {
                statusCode: 400,
                msg: "Invalid limit"
            }
        }
        const limit = params.limit
        const pages = params.total === 0 ? 1 : Math.ceil(params.total / limit)
        if (params.page < 0 || params.page > pages) {
            throw {
                statusCode: 400,
                msg: "Invalid page number"
            }
        }
        const offset = params.page * limit - limit

        return {
            offset,
            current: params.page,
            limit,
            total: params.total,
            pages,
        }
    }

    async getAllPaginated(query: { [key: string]: any }) {
        try {
            let filters = Object.keys(query)
            const search = query.search

            // where object initialization
            let whereObj: CustomProductWhereInput = search ? {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        code: {
                            contains: search,
                            mode: 'insensitive'

                        }
                    },

                ],
            } : {}

            // filter the query object and insert where clause in where object
            let q;
            filters.map((filter: any) => {
                if (this.accepted_filters.includes(filter)) {
                    q = query[filter].split(',')
                    whereObj[filter] = {
                        in: q,
                        mode: 'insensitive'
                    }
                }
            })


            const productsCount = await this.prismaService.product.count({
                where: whereObj,
                orderBy: { createdAt: 'desc' },

            })


            // handle pagination
            let pagination = this.pagination({
                limit: +query.limit ? +query.limit : 10,
                page: +query.page ? +query.page : 1,
                total: productsCount
            })

            // The QUERY 
            const data = await this.prismaService.product.findMany({
                where: whereObj,
                orderBy: [{ createdAt: 'desc' }, { name: "asc" }],
                take: pagination.limit,
                skip: pagination.offset,
            })
            // await Promise.all(data.map(async (product) => {
            //     product.image = await this.uploadFile_use_cases.mapFile((product.image) as string)
            // }))

            delete pagination.offset

            return { data, pagination }

        } catch (error: any) {
            throw error;
        }
    }

    async createFromExcel(data: Prisma.ProductCreateInput[]) {
        try {
            const products = []
            data.forEach(async (prod) => {
                let product = await this.prismaService.product.upsert({
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
                products.push(product)
            }
            )
            return products
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


    private accepted_filters = [
        'color',
        'size',
        'name',
        'qty',
        'code',
        'material',
        'minValue',
    ]
}