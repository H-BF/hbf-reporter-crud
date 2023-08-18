import { Router } from 'express'
import { IControllerRoute } from './route.controller.interface'
import { logger } from '../logger/logger.service'

export abstract class BaseController {

    private readonly _router: Router

    constructor() {
        this._router = Router()
    }

    get router() {
        return this._router
    }

    protected bindRouts(routes: IControllerRoute[]) {
        for (const route of routes) {
            logger.debug(`${route.method} bind to ${route.path}`)
            const middleware = route.middlewares?.map(m => m.execute.bind(m))
            const handler = route.func.bind(this)
            const pipeline = middleware ? [...middleware, handler] : handler
            this._router[route.method](route.path, pipeline)
        }
    }
}