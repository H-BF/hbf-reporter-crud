import { IsString, IsUUID } from "class-validator";

export class LaunchErrorCreateDto {

    @IsUUID()
    launch_uuid!: string

    @IsString()
    message!: string
}