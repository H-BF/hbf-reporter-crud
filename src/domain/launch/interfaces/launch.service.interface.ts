import { launch } from "@prisma/client"
import { LaunchCreateDto } from "../dto/launch.create.dto"
import { LaunchUpdateDto } from "../dto/launch.update.dto"
import { LaunchCloseDto } from "../dto/launch.close.dto"
import { LaunchFindWhereDto } from "../dto/launch.find.where.dto"

export interface ILaunchService {
    createNewLaunch(dto: LaunchCreateDto): Promise<string>
    closeLaunch(dto: LaunchCloseDto): Promise<void>
    updateLaunch(dto: LaunchUpdateDto): Promise<launch>
    getLaunchByUuid(uuid: string): Promise<launch | null>
    getLaunchsWhere(dto: LaunchFindWhereDto): Promise<{totalRows: number, launchs: launch[] | []}>
}