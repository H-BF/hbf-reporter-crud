import { Request, Response, NextFunction } from "express";
import { IExceptionFilter } from "./excepiton.filter.interface";
import { HTTPError } from "./custom/http-error";
import { logger } from "../common/logger/logger.service";

export class ExceptionFilter implements IExceptionFilter {

    catch(error: HTTPError, req: Request, res: Response, next: NextFunction): void {
        logger.err(`[${error.code}] - ${error.message}`)
        res.status(error.code).send(JSON.parse(error.message))
    };
}