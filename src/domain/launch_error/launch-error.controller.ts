import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller"
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { LaunchErrorCreateDto } from "./dto/launch-error.create.dto";
import { LaunchErrorFindDto } from "./dto/launch-error.find.dto";
import { LaunchErrorService } from "./launch-error.service";
import { HTTPError } from "../../errors/custom/http-error";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";

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

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await this.launchErrorService.create(req.body)
            res.status(201).send({})
        } catch (err: any) {
            next(new HTTPError(500, {
                title: "не удалось создать Launch Eroor",
                msg: err.message
            }))
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const launchErrors = await this.launchErrorService.getAll()
            res.status(200).send(launchErrors)
        } catch (err: any) {
            next(new HTTPError(500, {
                title: "не удалось получить данные по всем launch errors",
                msg: err.message
            }))
        }
    }

    async getByLaunchUuid(req: Request, res: Response, next: NextFunction) {
        try {
            const uuid = req.query['uuid']!!.toString()
            const launchError = await this.launchErrorService.getByLaunchUUID(uuid)
            res.status(200).send(launchError)
        } catch (err: any) {
            next(new HTTPError(500, {
                title: "не удалось получить данные по launch error",
                msg: err.message
            }))
        }
    }
}