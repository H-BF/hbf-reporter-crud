import { launch, launch_status } from "@prisma/client";
import { LaunchCreateDto } from "./dto/launch.create.dto";
import { LaunchUpdateDto } from "./dto/launch.update.dto";
import { ILaunchService } from "./interfaces/launch.service.interface";
import { Launch } from "./launch.entity";
import { LaunchRepository } from "./launch.repository";
import { LaunchCloseDto } from "./dto/launch.close.dto";
import { LaunchFindWhereDto } from "./dto/launch.find.where.dto";

export class LaunchService implements ILaunchService {

    constructor(private client: LaunchRepository) { }

    async createNewLaunch(dto: LaunchCreateDto): Promise<string> {
        const launch = new Launch(dto)
        const res = await this.client.create(launch)
        return res.uuid
    }

    async updateLaunch(dto: LaunchUpdateDto): Promise<launch> {
        const { uuid, ...data } = dto
        return await this.client.updateByUuid(uuid, data as Launch)
    }

    async closeLaunch(dto: LaunchCloseDto): Promise<void> {
        const launch = new Launch({
            status: launch_status.finish
        })
        await this.client.updateByUuid(dto.uuid, launch)
    }

    async getLaunchByUuid(uuid: string): Promise<launch | null> {
        return await this.client.getByUuid(uuid)
    }

    async getLaunchsWhere(dto: LaunchFindWhereDto): Promise<{totalRows: number, launchs: launch[] | []}> {
        const { offset, limit, ...data } = dto
        const launch = new Launch(data)
        const totalRows = await this.client.countAllRowsWhere(launch)
        const launchs = await this.client.getLaunchsWhere(launch, offset, limit)
        return {
            totalRows: totalRows,
            launchs: launchs || []
        }
    }
}