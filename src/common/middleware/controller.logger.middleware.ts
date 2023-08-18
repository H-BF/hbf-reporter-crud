import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "./midlleware.interface";
import { logger } from "../logger/logger.service";

class ControllerMethodLogger implements IMiddleware {
    
    async execute({ url, method, body }: Request, res: Response, next: NextFunction): Promise<void> {
        let msg = `[${method}] ${url} `     
        switch(method) {
            case 'GET':
                break;
            case 'POST':
                msg += `тело запроса: ${JSON.stringify(body)}`
                break;
            case 'PATCH':
                msg += `тело запроса: ${JSON.stringify(body)}`
                break;
        }
        logger.info(msg)
        next()
    }
}

export const controllerMethodLogger = new ControllerMethodLogger()