import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { AssertionsService } from "./assertions.service";
import { AssertionsCreateDto } from "./dto/assertions.create.dto";
import { AssertionsFindAllDto } from "./dto/assertions.find-all.dto";
import { AssertionsFindWhereDto } from "./dto/assertions.find-where.dto";
import { HTTPError } from "../../errors/custom/http-error";
import { PostArrayValidateMiddleware } from "../../common/middleware/post-array.validate.middleware";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";

export class AssertionsController extends BaseController {

    constructor(private assertionsService: AssertionsService) {
        super()
        this.bindRouts([
            {
                path: '/assertion',
                method: 'post',
                func: this.create,
                middlewares: [controllerMethodLogger, new PostValidateMiddleware(AssertionsCreateDto)]
            },
            {
                path: '/assertions',
                method: 'post',
                func: this.createAll,
                middlewares: [controllerMethodLogger, new PostArrayValidateMiddleware(AssertionsCreateDto)]
            },
            {
                path: '/assertions',
                method: 'get',
                func: this.getAllForLaunch,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(AssertionsFindAllDto)]
            },
            {
                path: '/assertions/where',
                method: 'get',
                func: this.getAllWhere,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(AssertionsFindWhereDto)]
            }
        ])
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await this.assertionsService.create(req.body)
            res.status(201).send({})
        } catch (err: any) {
            next(new HTTPError(500, {
                title: "не удалось создать Assertion",
                msg: err.message
            }))
        }
    }

    async createAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.assertionsService.createAll(req.body)
            res.status(201).send({ count: result })
        } catch (err: any) {
            next(new HTTPError(500, {
                title: 'не удалось создать Assertions',
                msg: err.message
            }))
        }
    }

    async getAllForLaunch(req: Request, res: Response, next: NextFunction) {
        const uuid = req.query['launch_uuid']!.toString()
        try {
            const result = await this.assertionsService.getAllForLaunch(uuid)
            res.status(200).send(result)
        } catch (err: any) {
            next(new HTTPError(500, {
                title: `не удалось получить данные для launch_uuid ${uuid}`,
                msg: err.message
            }))
        }
    }

    async getAllWhere(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.assertionsService.getAllWhere(req.query)
            res.status(200).send(result)
        } catch (err: any) {
            next(new HTTPError(500, {
                title: `не удалось получить данные для Assertions`,
                msg: err.message
            }))
        }
    }
}