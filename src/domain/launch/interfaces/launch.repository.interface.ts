import { launch } from '@prisma/client'
import { Launch } from '../launch.entity'

export interface ILaunchRepository {
    create(launch: Launch): Promise<launch>
    updateByUuid(uuid: string, launch: Launch): Promise<launch>
    getByUuid(uuid: string): Promise<launch | null>
    getAll(): Promise<launch[] | null>
}