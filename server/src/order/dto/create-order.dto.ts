import { CreateClientDto } from "@/client/dto/create-client.dto";
import { CreateProductDto } from "@/product/dto/create-product.dto";
import { Prisma } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateOrderDto implements Omit<Prisma.OrderCreateInput, "products" | "client"> {
    @IsNotEmpty()
    @IsString()
    purchasingNum: string;

    @IsNotEmpty()
    @IsInt()
    qty: number;

    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    productsIds: string[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateClientDto)
    client: CreateClientDto;

    @IsOptional()
    @IsString()
    clientId: string;

}
