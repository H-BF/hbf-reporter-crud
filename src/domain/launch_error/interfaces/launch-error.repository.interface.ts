import { launch_error } from "@prisma/client";
import { ILaunchError } from "../launch-error.entity";

export interface ILaunchErrorRepository {
    create(launchError: ILaunchError): Promise<launch_error>
    getByLaunchUuid(uuid: string): Promise<launch_error | null>
    getAll(): Promise<launch_error[] | null>
}