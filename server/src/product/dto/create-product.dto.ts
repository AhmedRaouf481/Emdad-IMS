import { Prisma } from "@prisma/client";
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto implements Prisma.ProductCreateInput {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsNotEmpty()
    @IsNumber()
    pkgCapacity: number;

    @IsOptional()
    @IsString()
    color: string;

    @IsOptional()
    @IsString()
    dimension: string;

    @IsOptional()
    @IsString()
    material: string;

    @IsOptional()
    @IsString()
    minValue: number;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    photo?: string;

    @IsOptional()
    @IsString()
    size?: string;

    @IsOptional()
    @IsInt()
    weight: number;
}
