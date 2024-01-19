import { IsNumber, IsString } from 'class-validator'

export class LaunchCreateDto {

    @IsNumber()
    pipeline!: string

    @IsNumber()
    job!: string

    @IsString()
    srcBranch!: string

    @IsString()
    commit!: string

    @IsString()
    tag!: string

    @IsString()
    serviceName!: string
}