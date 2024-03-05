import { Prisma } from "@prisma/client";

export class CreateClientDto implements Prisma.ClientCreateInput {
    id?: string;
    code: string;
    name: string;
    address: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    orders?: Prisma.OrderCreateNestedManyWithoutClientInput;
}
