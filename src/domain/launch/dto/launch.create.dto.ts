import { IsNumber } from 'class-validator'

export class LaunchCreateDto {

    @IsNumber()
    pipeline!: string;

    @IsNumber()
    job!: string;
}