import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controller/base.controller";
import { GetValidateMiddleware } from "../../common/middleware/get.validate.middleware";
import { PostValidateMiddleware } from "../../common/middleware/post.validate.middleware";
import { AssertionsService } from "./assertions.service";
import { AssertionsCreateDto } from "./dto/assertions.create.dto";
import { AssertionsFindWhereDto } from "./dto/assertions.find-where.dto";
import { PostArrayValidateMiddleware } from "../../common/middleware/post-array.validate.middleware";
import { controllerMethodLogger } from "../../common/middleware/controller.logger.middleware";
import { tryCatch } from "../../decorator/controller.try-catch.decorator";

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
                func: this.getAllWhere,
                middlewares: [controllerMethodLogger, new GetValidateMiddleware(AssertionsFindWhereDto)]
            }
        ])
    }

    @tryCatch("не удалось создать Assertion")
    async create(req: Request, res: Response, next: NextFunction) {
        await this.assertionsService.create(req.body)
        res.status(201).send({})
    }

    @tryCatch("не удалось создать Assertions")
    async createAll(req: Request, res: Response, next: NextFunction) {
        const result = await this.assertionsService.createAll(req.body)
        res.status(201).send({ count: result })
    }

    @tryCatch("не удалось получить данные для Assertions")
    async getAllWhere(req: Request, res: Response, next: NextFunction) {
        const result = await this.assertionsService.getAllWhere(req.query)
        res.status(200).send(result)
    }
}