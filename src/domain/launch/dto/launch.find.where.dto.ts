import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";
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
    commit?: string

    @IsOptional()
    @IsString()
    tag?: string

    @IsNumberString()
    @IsOptional()
    offset?: number

    @IsNumberString()
    @IsOptional()
    limit?: number

    @IsOptional()
    @IsIn(Object.keys(launch_status))
    status?: launch_status

    @IsString()
    @IsOptional()
    serviceName?: string
}