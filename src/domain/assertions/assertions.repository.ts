import { $Enums, assertions } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { Assertions } from "./assertions.entity";
import { IAssertionsRepository } from "./interfaces/assertions.repository.interface";

export class AssertionsRepository implements IAssertionsRepository {

    constructor(private prismaService: PrismaService) { }

    async create(assertion: Assertions): Promise<assertions> {
        return await this.prismaService.client.assertions.create({
            data: this.transform(assertion)
        })
    }

    async createMany(assertions: Assertions[]): Promise<number> {
        let data: any[] = []
        console.log("Assertions: " + assertions.length)
        assertions.forEach(assertion => {
            data = data.concat(this.transform(assertion))
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
        let where: any = this.transform(assertion)
        return await this.prismaService.client.assertions.findMany({
            where: where,
            skip: Number(offset) || undefined,
            take: Number(limit) || undefined
        })
    }

    async countAllRowsWhere(assertion: Assertions): Promise<number> {
        let where: any = this.transform(assertion)
        return await this.prismaService.client.assertions.count({
            where: where
        })
    }

    private transform(assertion: Assertions): any {
        let data: any = {}
        if (assertion.launchUuid != undefined) { data.launch_uuid = assertion.launchUuid }
        if (assertion.srcIp != undefined) { data.src_ip = assertion.srcIp }
        if (assertion.srcPort != undefined) { data.src_port = assertion.srcPort }
        if (assertion.dstIp != undefined) { data.dst_ip = assertion.dstIp }
        if (assertion.dstPort != undefined) { data.dst_port = assertion.dstPort }
        if (assertion.protocol != undefined) { data.protocol = assertion.protocol }
        if (assertion.from != undefined) { data.from = assertion.from }
        if (assertion.to != undefined) { data.to = assertion.to }
        if (assertion.fromType != undefined) { data.from_type = assertion.fromType }
        if (assertion.toType != undefined) { data.to_type = assertion.toType }
        if (assertion.status != undefined) { data.status = assertion.status }
        if (assertion.testName != undefined) { data.test_name = assertion.testName }
        if (assertion.icmpType != undefined) { data.icmp_type = assertion.icmpType }
        if (assertion.icmpCommand != undefined) { data.icmp_command = assertion.icmpCommand } 
        if (assertion.msgErr != undefined) { data.msg_err = assertion.msgErr }
        return data
    }
}
