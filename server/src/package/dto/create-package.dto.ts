import { CreateItemDto } from "@/item/dto/create-item.dto";
import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { CreatePackageOnlyDto } from "./create-package-only.dto";

export class CreatePackageDto extends CreatePackageOnlyDto {
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateItemDto)
    item: CreateItemDto

}
