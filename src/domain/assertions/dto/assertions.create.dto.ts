import { assertion_status, protocol } from "@prisma/client"
import { IsIn, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class AssertionsCreateDto {
    
    @IsUUID()
    launchUUID!: string
    
    @IsString()
    srcIp!: string
    
    @IsNumber()
    srcPort!: number
    
    @IsString()
    dstIp!: string
    
    @IsNumber()
    dstPort!: number
    
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