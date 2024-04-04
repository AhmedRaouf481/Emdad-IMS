import { CreateClientDto } from "@/client/dto/create-client.dto";
import { Prisma } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

class ProdutForOrder {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    id: string;
}
export class OrderProductDto {
    @IsNotEmpty()
    @IsInt()
    qty: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ProdutForOrder)
    product: ProdutForOrder;

}

export class CreateOrderDto implements Omit<Prisma.OrderCreateInput, "products" | "client"> {
    @IsNotEmpty()
    @IsString()
    purchasingNum: string;


    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    products: OrderProductDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateClientDto)
    client: CreateClientDto;

    @IsOptional()
    @IsString()
    clientId: string;

}
