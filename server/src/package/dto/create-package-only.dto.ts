import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreatePackageOnlyDto implements Prisma.PackageCreateInput {

    product: Prisma.ProductCreateNestedOneWithoutPackagesInput;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @IsOptional()
    @IsString()
    barcode: string;  // Barcode

}
