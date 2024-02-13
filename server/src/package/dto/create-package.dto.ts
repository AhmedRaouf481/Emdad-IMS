import { CreateItemDto } from "@/item/dto/create-item.dto";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreatePackageDto {
    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsOptional()
    @IsString()
    code: string;  // Barcode

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateItemDto)
    item: CreateItemDto

}
