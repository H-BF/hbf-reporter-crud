import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/controller/base.controller";
import { LaunchService } from "./launch.service";
import { HTTPError } from "../../errors/custom/http-error";
import { LaunchCreateDto } from "./dto/launch.create.dto";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { LaunchFindDto } from "./dto/launch.find.dto";
import { LaunchUpdateDto } from "./dto/launch.update.dto";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";

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

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const uuid = await this.launchServise.createNewLaunch(req.body)
            res.status(201).send({ "uuid": uuid })
        } catch (err: any) {
            next(new HTTPError(500, {
                title: "не удалось создать Launch",
                msg: err.message
            }))
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const launch = await this.launchServise.updateLaunch(req.body)
            res.status(200).send(launch)
        } catch (err: any) {
            next(new HTTPError(500, {
                title: "не удалось обновить launch",
                msg: err.message
            }))
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const launchs = await this.launchServise.getAllLaunchs()
            res.status(200).send(launchs)
        } catch (err: any) {
            next(new HTTPError(500, {
                title: "не удалось получить данные по всем launch",
                msg: err.message
            }))
        }
    }
    
    async getOneByUuid(req: Request, res: Response, next: NextFunction) {
        try {
            const uuid = req.query['uuid']!!.toString()
            const launch = await this.launchServise.getLaunchByUuid(uuid)
            res.status(200).send(launch)
        } catch (err: any) {
            next(new HTTPError(500, {
                title: "не удалось получить данные по launch",
                msg: err.message
            }))
        }
    }
}