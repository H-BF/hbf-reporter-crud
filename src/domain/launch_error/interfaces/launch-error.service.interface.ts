import { launch_error } from "@prisma/client"
import { LaunchErrorCreateDto } from "../dto/launch-error.create.dto"
import { LaunchErrorFindDto } from "../dto/launch-error.find.dto"

export interface ILaunchErrorService {
    create(dto: LaunchErrorCreateDto): Promise<void>
    getByLaunchUUID(uuid: string): Promise<launch_error | null>
    getAll(): Promise<launch_error[] | null>
}