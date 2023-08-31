import { IsIn, IsOptional, IsString } from "class-validator";
import { launch_status } from "@prisma/client";

export class LaunchFindWhereDto {

    @IsOptional()
    @IsString()
    pipeline?: string

    @IsOptional()
    @IsString()
    job?: string

    @IsOptional()
    @IsString()
    srcBranch?: string

    @IsOptional()
    @IsString()
    dstBranch?: string

    @IsOptional()
    @IsString()
    commit?: string

    @IsOptional()
    @IsString()
    hbfTag?: string

    @IsOptional()
    @IsIn(Object.keys(launch_status))
    status?: launch_status
}