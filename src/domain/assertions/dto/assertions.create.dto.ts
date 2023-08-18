import { assertion_status, protocol } from "@prisma/client"
import { IsIn, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class AssertionsCreateDto {
    
    @IsUUID()
    launchUUID!: string
    
    @IsString()
    srcIp!: string
    
    @IsString()
    srcPort!: string
    
    @IsString()
    dstIp!: string
    
    @IsString()
    dstPort!: string
    
    @IsIn(Object.keys(protocol))
    protocol!: protocol
    
    @IsString()
    sgFrom!: string
    
    @IsString()
    sgTo!: string
    
    @IsIn(Object.keys(assertion_status))
    status!: assertion_status
    
    @IsString()
    @IsOptional()
    msgErr!: string
}