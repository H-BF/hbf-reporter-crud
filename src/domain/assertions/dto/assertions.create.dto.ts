import { assertion_status, direction_type, protocol, traffic } from "@prisma/client"
import { IsIn, IsOptional, IsString, IsUUID } from "class-validator"

export class AssertionsCreateDto {
    
    @IsUUID()
    launchUUID!: string
    
    @IsString()
    srcIp!: string
    
    @IsString()
    @IsOptional()
    srcPort!: string
    
    @IsString()
    dstIp!: string
    
    @IsString()
    @IsOptional()
    dstPort!: string
    
    @IsIn(Object.keys(protocol))
    protocol!: protocol
    
    @IsString()
    from!: string
    
    @IsString()
    to!: string
    
    @IsIn(Object.keys(direction_type))
    fromType!: direction_type

    @IsIn(Object.keys(direction_type))
    toType!: direction_type

    @IsIn(Object.keys(assertion_status))
    status!: assertion_status
    
    @IsString()
    @IsOptional()
    msgErr!: string

    @IsString()
    @IsOptional()
    icmpType!: string

    @IsString()
    @IsOptional()    
    icmpCommand!: string

    @IsString()
    testName!: string;

    @IsIn(Object.keys(traffic))
    traffic!: traffic
}