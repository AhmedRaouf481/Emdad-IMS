import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClientDto implements Prisma.ClientCreateInput {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;
}
