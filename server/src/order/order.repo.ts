import { PrismaGenericRepo } from "@/shared/prisma-client/prisma-generic.repo";
import { PrismaService } from "@/shared/prisma-client/prisma.service";
import { Injectable } from "@nestjs/common";
import { Order, Prisma } from "@prisma/client";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderRepo extends PrismaGenericRepo<Prisma.OrderCreateInput, Order> {
    constructor(private prismaService: PrismaService) {
        super('order', prismaService, { products: true, client: true })
    }

    async create_order(data: CreateOrderDto) {
        try {
            let { products, client, clientId, ...orderData } = data
            let clinetConnectOrCreate;
            if (client) {
                clinetConnectOrCreate = {
                    create: { ...client }
                }
            } else {
                clinetConnectOrCreate = {
                    connect: {
                        id: clientId
                    }
                }
            }
            const order = await this.prismaService.$transaction(async (tx) => {
                try {

                    const newOrder = await tx.order.create({
                        data: {
                            ...orderData,
                            products: {
                                create: products.map(product => ({
                                    productId: product.product.id,
                                    qty: product.qty
                                }))
                            },
                            client: clinetConnectOrCreate
                        }
                    })
                    products.forEach(async (product) => {
                        await tx.product.update({
                            where: { id: product.product.id },
                            data: {
                                qty: { decrement: product.qty },
                            }
                        })
                    })
                    return newOrder
                } catch (error) {
                    throw error
                }
            })
            return order
        } catch (error) {
            throw error
        }
    }
}