import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller"
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { LaunchErrorCreateDto } from "./dto/launch-error.create.dto";
import { LaunchErrorFindDto } from "./dto/launch-error.find.dto";
import { LaunchErrorService } from "./launch-error.service";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";
import { tryCatch } from "../../decorator/controller.try-catch.decorator";

export class LaunchErrorController extends BaseController {

    constructor(private launchErrorService: LaunchErrorService) {
        super()
        this.bindRouts([
            {
                path: '/launch_error',
                method: 'post',
                func: this.create,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(LaunchErrorCreateDto)]
            },
            {
                path: '/launch_error',
                method: 'get',
                func: this.getByLaunchUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(LaunchErrorFindDto)]
            },
            {
                path: '/launchs_error',
                method: 'get',
                func: this.getAll,
                middlewares: [controllerMethodLogger]
            }
        ])
    }

    @tryCatch("не удалось создать Launch Eroor")
    async create(req: Request, res: Response, next: NextFunction) {
        await this.launchErrorService.create(req.body)
        res.status(201).send({})
    }

    @tryCatch("не удалось получить данные по всем launch errors")
    async getAll(req: Request, res: Response, next: NextFunction) {
        const launchErrors = await this.launchErrorService.getAll()
        res.status(200).send(launchErrors)
    }

    @tryCatch("не удалось получить данные по launch error")
    async getByLaunchUuid(req: Request, res: Response, next: NextFunction) {
        const launchUuid = req.query['launchUuid']!!.toString()
        const launchError = await this.launchErrorService.getByLaunchUUID(launchUuid)
        res.status(200).send(launchError)
    }
}