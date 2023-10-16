import { assertion_status, direction_type, protocol } from "@prisma/client"
import { IsIn, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator"

export class AssertionsFindWhereDto {

    @IsOptional()
    @IsUUID()
    launchUUID?: string;

    @IsOptional()
    @IsString()
    srcIp?: string;

    @IsOptional()
    @IsString()
    srcPort?: string;

    @IsOptional()
    @IsString()
    dstIp?: string

    @IsOptional()
    @IsString()
    dstPort?: string

    @IsOptional()
    @IsIn(Object.keys(protocol))
    protocol?: protocol;

    @IsOptional()
    @IsString()
    from?: string

    @IsOptional()
    @IsString()
    to?: string

    @IsOptional()
    @IsIn(Object.keys(direction_type))
    fromType?: direction_type

    @IsOptional()
    @IsIn(Object.keys(direction_type))
    toType?: direction_type

    @IsNumberString()
    @IsOptional()
    offset?: number

    @IsNumberString()
    @IsOptional()
    limit?: number

    @IsOptional()
    @IsIn(Object.keys(assertion_status))
    status?: assertion_status;

    @IsOptional()
    @IsString()
    msgErr?: string;
}