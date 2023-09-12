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
                src_branch: launch.srcBranch!,
                dst_branch: launch.dstBranch!,
                commit: launch.commit!,
                fail_count: Number(launch.failCount),
                pass_count: Number(launch.passCount),
                duration: Number(launch.duration),
                hbf_tag: launch.hbfTag!,
                status: launch.status
            }
        })
    }

    async updateByUuid(uuid: string, launch: Launch): Promise<launch> {
        let data: any = this.transform(launch)
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

    async getLaunchsWhere(
        launch: Launch,
        offset?: number,
        limit?: number
    ): Promise<launch[] | null> {
        let where: any = this.transform(launch)
        return await this.prismaService.client.launch.findMany({
            where: where,
            skip: Number(offset) || undefined,
            take: Number(limit) || undefined,
            orderBy: [
                { pipeline: 'desc' },
                { job: 'desc' }
            ]
        })
    }

    async countAllRowsWhere(launch: Launch): Promise<number> {
        let where: any = this.transform(launch)
        return await this.prismaService.client.launch.count({
            where: where
        })
    }

    private transform(launch: Launch): any {
        let result: any = {}
        if (launch.pipeline != undefined) { result.pipeline = Number(launch.pipeline) }
        if (launch.job != undefined) { result.job = Number(launch.job) }
        if (launch.srcBranch != undefined) { result.src_branch = launch.srcBranch }
        if (launch.dstBranch != undefined) { result.dst_branch = launch.dstBranch }
        if (launch.commit != undefined) { result.commit = launch.commit }
        if (launch.failCount != undefined) { result.fail_count = Number(launch.failCount) }
        if (launch.passCount != undefined) { result.pass_count = Number(launch.passCount) }
        if (launch.duration != undefined) { result.duration = Number(launch.duration) }
        if (launch.hbfTag != undefined) { result.hbf_tag = launch.hbfTag }
        if (launch.status != undefined) { result.status = launch.status }
        return result 
    }
}