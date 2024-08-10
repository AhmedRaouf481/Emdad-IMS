import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import pagination from '@/shared/utlis/pagination';
import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
interface CustomProductWhereInput extends Prisma.ProductWhereInput {
  [key: string]: any; // Allow dynamic property assignment
}

@Injectable()
export class ProductRepo extends PrismaGenericRepo<
  Prisma.ProductCreateInput,
  Product
> {
  constructor(private prismaService: PrismaService) {
    super('product', prismaService);
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
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                code: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                color: {
                  contains: search,
                  mode: 'insensitive',
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

      const productsCount = await this.prismaService.product.count({
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
      const data = await this.prismaService.product.findMany({
        where: { ...whereObj, isDeleted: false },
        orderBy: [{ createdAt: 'desc' }, { name: 'asc' }],
        take: paginationObj.limit,
        skip: paginationObj.offset,
        include: { category: true },
      });
      // await Promise.all(data.map(async (product) => {
      //     product.image = await this.uploadFile_use_cases.mapFile((product.image) as string)
      // }))

      delete paginationObj.offset;

      return { data, pagination: paginationObj };
    } catch (error: any) {
      throw error;
    }
  }

  async createFromExcel(data: Record<string, any[]>) {
    try {
      const products = [];
      Object.keys(data).forEach(async (key) => {
        let category = await this.prismaService.category.create({
          data: {
            name: key,
          },
        });
        data[key].forEach(async (prod) => {
          let product = await this.prismaService.product.upsert({
            where: { code: prod.code },
            create: {
              ...prod,
              category: {
                connect: {
                  id: category.id,
                },
              },
            },
            update: {
              qty: { increment: prod.qty },
              price: prod.price,
              pkgCapacity: prod.pkgCapacity,
            },
          });
          products.push(product);
        });
      });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getCategories() {
    try {
      const categories = await this.prismaService.category.findMany();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async createMany(data: Prisma.ProductCreateInput[]) {
    try {
      const products = await this.prismaService.product.createMany({
        data,
      });

      return products;
    } catch (error) {
      throw error;
    }
  }

  async deleteMany() {
    try {
      const products = await this.prismaService.product.deleteMany({});

      return products;
    } catch (error) {
      throw error;
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
    'category',
  ];
}
