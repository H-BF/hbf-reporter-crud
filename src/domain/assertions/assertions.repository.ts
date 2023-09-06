import { $Enums, assertions } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { Assertions } from "./assertions.entity";
import { IAssertionsRepository } from "./interfaces/assertions.repository.interface";

export class AssertionsRepository implements IAssertionsRepository {

    constructor(private prismaService: PrismaService) { }

    async create(assertion: Assertions): Promise<assertions> {
        return await this.prismaService.client.assertions.create({
            data: this.transform(assertion, TransformType.CREATE)
        })
    }

    async createMany(assertions: Assertions[]): Promise<number> {
        let data: any[] = []
        assertions.forEach(assertion => {
            data = data.concat(this.transform(assertion, TransformType.CREATE))
        })
        const { count } = await this.prismaService.client.assertions.createMany({
            data: data
        })
        return count
    }

    async getAssertionsWhere(
        assertion: Assertions,
        offset?: number,
        limit?: number
    ): Promise<assertions[] | null> {
        let where: any = this.transform(assertion, TransformType.WHERE)
        return await this.prismaService.client.assertions.findMany({
            where: where,
            skip: Number(offset) || undefined,
            take: Number(limit) || undefined
        })
    }

    async countAllRowsWhere(assertion: Assertions): Promise<number> {
        let where: any = this.transform(assertion, TransformType.WHERE)
        return await this.prismaService.client.assertions.count({
            where: where
        })
    }

    private transform(assertion: Assertions, type: TransformType): any {
        let data: any = {}
        if (assertion.launchUuid != undefined) { data.launch_uuid = assertion.launchUuid }
        if (assertion.srcIp != undefined) { data.src_ip = assertion.srcIp }
        if (assertion.srcPort != undefined) { data.src_port = assertion.srcPort }
        if (assertion.dstIp != undefined) { data.dst_ip = assertion.dstIp }
        if (assertion.dstPort != undefined) { data.dst_port = assertion.dstPort }
        if (assertion.protocol != undefined) { data.protocol = assertion.protocol }
        if (assertion.sgFrom != undefined) { data.sg_from = assertion.sgFrom }
        if (assertion.sgTo != undefined) { data.sg_to = assertion.sgTo }
        if (assertion.status != undefined) { data.status = assertion.status }

        switch (type) {
            case TransformType.WHERE:
                if (assertion.msgErr != undefined) { data.msg_err = assertion.msgErr }
                break;
            case TransformType.CREATE:
                if (assertion.msgErr != undefined) {
                    data.msg_err = assertion.msgErr
                } else {
                    data.msg_err = null
                }
                break;
        }
        return data
    }
}

export enum TransformType { WHERE, CREATE }
