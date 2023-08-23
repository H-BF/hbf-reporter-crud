import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/controller/base.controller";
import { LaunchService } from "./launch.service";
import { LaunchCreateDto } from "./dto/launch.create.dto";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { LaunchFindDto } from "./dto/launch.find.dto";
import { LaunchUpdateDto } from "./dto/launch.update.dto";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";
import { tryCatch } from "../../decorator/controller.try-catch.decorator";

export class LaunchController extends BaseController {

    constructor(private launchServise: LaunchService) {
        super()
        this.bindRouts([
            {
                path: '/launch',
                method: 'get',
                func: this.getOneByUuid,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(LaunchFindDto)]
            },
            {
                path: '/launch',
                method: 'post',
                func: this.create,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(LaunchCreateDto)]
            },
            {
                path: '/launch',
                method: 'patch',
                func: this.update,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(LaunchUpdateDto)]
            },
            {
                path: '/launchs',
                method: 'get',
                func: this.getAll,
                middlewares: [controllerMethodLogger]
            }
        ])
    }

    @tryCatch("не удалось создать Launch")
    async create(req: Request, res: Response, next: NextFunction) {
        const uuid = await this.launchServise.createNewLaunch(req.body)
        res.status(201).send({ "uuid": uuid })
}

    @tryCatch("не удалось обновить launch")
    async update(req: Request, res: Response, next: NextFunction) {
        const launch = await this.launchServise.updateLaunch(req.body)
        res.status(200).send(launch)
    }

    @tryCatch("не удалось получить данные по всем launch")
    async getAll(req: Request, res: Response, next: NextFunction) {
        const launchs = await this.launchServise.getAllLaunchs()
        res.status(200).send(launchs)
    }
    
    @tryCatch("не удалось получить данные по launch")
    async getOneByUuid(req: Request, res: Response, next: NextFunction) {
        const uuid = req.query['uuid']!!.toString()
        const launch = await this.launchServise.getLaunchByUuid(uuid)
        res.status(200).send(launch)
    }
}