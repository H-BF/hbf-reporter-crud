import { launch_error } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { ILaunchErrorRepository } from "./interfaces/launch-error.repository.interface";
import { ILaunchError } from "./launch-error.entity";

export class LaunchErrorRepository implements ILaunchErrorRepository {

    constructor(private prismaService: PrismaService) { }

    async create(launchError: ILaunchError): Promise<launch_error> {
        return await this.prismaService.client.launch_error.create({
            data: {
                launch_uuid: launchError.launchUUID,
                message: launchError.message
            }
        })
    }

    async getByLaunchUuid(launchUuid: string): Promise<launch_error | null> {
        return await this.prismaService.client.launch_error.findFirst({
            where: {
                launch_uuid: launchUuid
            }
        })
    }

    async getAll(): Promise<launch_error[] | null> {
        return await this.prismaService.client.launch_error.findMany()
    }
}