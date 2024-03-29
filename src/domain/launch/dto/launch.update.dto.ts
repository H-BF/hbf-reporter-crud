import { IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { launch_status } from "@prisma/client"

export class LaunchUpdateDto {

    @IsUUID()
    uuid!: string

    @IsOptional()
    @IsNumber()
    failCount?: number

    @IsOptional()
    @IsNumber()
    passCount?: number

    @IsOptional()
    @IsNumber()
    duration?: number

    @IsOptional()
    @IsIn(Object.keys(launch_status))
    status?: launch_status
}