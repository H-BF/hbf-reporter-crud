import { IsString, IsUUID } from "class-validator"

export class LaunchErrorFindDto {

    @IsUUID()
    launch_uuid!: string

}