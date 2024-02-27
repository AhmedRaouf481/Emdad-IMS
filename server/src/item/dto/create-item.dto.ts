import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateItemDto implements Omit<Prisma.ItemCreateInput, 'product'> {
    @IsNotEmpty()
    @IsString()
    barcode: string;

    @IsNotEmpty()
    @IsString()
    productId: string;

}
