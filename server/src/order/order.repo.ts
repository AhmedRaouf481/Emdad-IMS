import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import pagination from '@/shared/utlis/pagination';

interface CustomProductWhereInput extends Prisma.OrderWhereInput {
  [key: string]: any; // Allow dynamic property assignment
}

@Injectable()
export class OrderRepo extends PrismaGenericRepo<
  Prisma.OrderCreateInput,
  Order
> {
  constructor(private prismaService: PrismaService) {
    super('order', prismaService, {
      products: { include: { product: true } },
      client: true,
    });
  }

  async create_order(data: CreateOrderDto) {
    try {
      let { products, client, clientId, ...orderData } = data;
      let clinetConnectOrCreate;
      if (client) {
        clinetConnectOrCreate = {
          create: { ...client },
        };
      } else {
        clinetConnectOrCreate = {
          connect: {
            id: clientId,
          },
        };
      }
      for (const product of products) {
        try {
          const productRecord = await this.prismaService.product.findUnique({
            where: { id: product.product.id },
            select: { qty: true,code:true },
          });
  
          if (!productRecord || product.qty > productRecord.qty) {
            throw {
              statusCode: 400,
              msg: `Quantity is more than available quantity for product code: ${productRecord?.code}`,
            };
          }
  
          await this.prismaService.product.update({
            where: { id: product.product.id },
            data: {
              qty: { decrement: product.qty },
            },
          });
        } catch (error) {
          throw error;
        }
      }
      const order = await this.prismaService.order.create({
        data: {
          ...orderData,
          products: {
            create: products.map((product) => ({
              productId: product.product.id,
              qty: product.qty,
            })),
          },
          client: clinetConnectOrCreate,
        },
      });

      return order;
    } catch (error) {
      throw error;
    }
  }

  async getAllPaginated(query: { [key: string]: any }) {
    try {
      let filters = Object.keys(query);
      const search = query.search;

      // where object initialization
      let whereObj: CustomProductWhereInput = search
        ? {
            OR: [
              {
                purchasingNum: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                client: {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                client: {
                  code: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                products: {
                  some: {
                    product: {
                      name: {
                        contains: search,
                        mode: 'insensitive',
                      },
                    },
                  },
                },
              },
            ],
          }
        : {};

      // filter the query object and insert where clause in where object
      let q;
      filters.map((filter: any) => {
        if (this.accepted_filters.includes(filter)) {
          q = query[filter].split(',');
          if (filter === 'category') {
            whereObj[filter] = {
              name: {
                in: q,
                mode: 'insensitive',
              },
            };
          } else {
            whereObj[filter] = {
              in: q,
              mode: 'insensitive',
            };
          }
        }
      });

      const productsCount = await this.prismaService.order.count({
        where: whereObj,
        orderBy: { createdAt: 'desc' },
      });

      // handle pagination
      let paginationObj = pagination({
        limit: +query.limit ? +query.limit : 10,
        page: +query.page ? +query.page : 1,
        total: productsCount,
      });

      // The QUERY
      const data = await this.prismaService.order.findMany({
        where: whereObj,
        orderBy: { createdAt: 'desc' },
        take: paginationObj.limit,
        skip: paginationObj.offset,
        include: this.includesObj as Prisma.OrderInclude,
      });

      delete paginationObj.offset;

      return { data, pagination: paginationObj };
    } catch (error: any) {
      throw error;
    }
  }

  private accepted_filters = [
    'client-name',
    'product-code',
    'product-name',
    'product-category',
  ];
}
