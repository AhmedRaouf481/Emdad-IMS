import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreatePackageOnlyDto {
    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsOptional()
    @IsString()
    code: string;  // Barcode

}
