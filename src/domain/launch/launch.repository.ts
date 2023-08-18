import { launch } from '@prisma/client'
import { ILaunchRepository } from "./interfaces/launch.repository.interface";
import { Launch } from './launch.entity';
import { PrismaService } from '../../database/prisma.service';

export class LaunchRepository implements ILaunchRepository {

    constructor(private prismaService: PrismaService) { }

    async create(launch: Launch): Promise<launch> {
        return await this.prismaService.client.launch.create({
            data: {
                pipeline: Number(launch.pipeline),
                job: Number(launch.job),
                fail_count: launch.failCount,
                pass_count: launch.passCount,
                duration: launch.duration,
                status: launch.status
            }
        })
    }

    async updateByUuid(uuid: string, launch: Launch): Promise<launch> {

        let data: any = {}

        if (launch.pipeline != undefined) { data.pipeline = launch.pipeline }
        if (launch.job != undefined) { data.job = launch.job }
        if (launch.failCount != undefined) { data.fail_count = launch.failCount }
        if (launch.passCount != undefined) { data.pass_count = launch.passCount }
        if (launch.duration != undefined) { data.duration = launch.duration }
        if (launch.status != undefined) { data.status = launch.status }

        return await this.prismaService.client.launch.update({
            data: data,
            where: {
                uuid: uuid
            }
        })
    }

    async getByUuid(uuid: string): Promise<launch | null> {
        return await this.prismaService.client.launch.findFirst({
            where: {
                uuid: uuid
            }
        })
    }

    async getAll(): Promise<launch[] | null> {
        return await this.prismaService.client.launch.findMany()
    }
}