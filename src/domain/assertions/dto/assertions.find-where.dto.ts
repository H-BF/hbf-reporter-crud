import { assertion_status, protocol } from "@prisma/client"
import { IsIn, IsString, IsUUID, ValidateIf } from "class-validator"

export class AssertionsFindWhereDto {
    @ValidateIf((obj) => {
        return !obj.srcIp && !obj.srcPort && !obj.dstIp && !obj.dstPort && !obj.protocol && !obj.sgFrom && !obj.sgTo && !obj.status && !obj.msgErr;
    })
    @IsUUID()
    launchUUID?: string;

    @ValidateIf((obj) => {
        return !obj.launchUUID && !obj.srcPort && !obj.dstIp && !obj.dstPort && !obj.protocol && !obj.sgFrom && !obj.sgTo && !obj.status && !obj.msgErr;
    })
    @IsString()
    srcIp?: string;

    @ValidateIf((obj) => {
        return !obj.launchUUID && !obj.srcIp && !obj.dstIp && !obj.dstPort && !obj.protocol && !obj.sgFrom && !obj.sgTo && !obj.status && !obj.msgErr;
    })
    @IsString()
    srcPort?: string;

    @ValidateIf((obj) => {
        return !obj.launchUUID && !obj.srcPort && !obj.srcIp && !obj.dstPort && !obj.protocol && !obj.sgFrom && !obj.sgTo && !obj.status && !obj.msgErr;
    })
    @IsString()
    dstIp?: string

    @ValidateIf((obj) => {
        return !obj.launchUUID && !obj.srcIp && !obj.dstIp && !obj.srcPort && !obj.protocol && !obj.sgFrom && !obj.sgTo && !obj.status && !obj.msgErr;
    })
    @IsString()
    dstPort?: string

    @ValidateIf((obj) => {
        return !obj.launchUUID && !obj.srcIp && !obj.srcPort && !obj.dstIp && !obj.dstPort && !obj.sgFrom && !obj.sgTo && !obj.status && !obj.msgErr;
    })
    @IsIn(Object.keys(protocol))
    protocol?: protocol;

    @ValidateIf((obj) => {
        return !obj.launchUUID && !obj.srcIp && !obj.srcPort && !obj.dstIp && !obj.dstPort && !obj.protocol && !obj.sgTo && !obj.status && !obj.msgErr;
    })
    @IsString()
    sgFrom?: string

    @ValidateIf((obj) => {
        return !obj.launchUUID && !obj.srcIp && !obj.srcPort && !obj.dstIp && !obj.dstPort && !obj.sgFrom && !obj.protocol && !obj.status && !obj.msgErr;
    })
    @IsString()
    sgTo?: string

    @ValidateIf((obj) => {
        return !obj.launchUUID && !obj.srcIp && !obj.srcPort && !obj.dstIp && !obj.dstPort && !obj.protocol && !obj.sgTo && !obj.status && !obj.msgErr;
    })
    @IsIn(Object.keys(assertion_status))
    status?: assertion_status;

    @ValidateIf((obj) => {
        return !obj.launchUUID && !obj.srcIp && !obj.srcPort && !obj.dstIp && !obj.dstPort && !obj.protocol && !obj.sgFrom && !obj.status;
    })
    @IsString()
    msgErr?: string;
}