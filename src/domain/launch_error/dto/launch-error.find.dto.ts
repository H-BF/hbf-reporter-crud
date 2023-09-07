import { IsUUID } from "class-validator"

export class LaunchErrorFindDto {

    @IsUUID()
    launchUuid!: string

}