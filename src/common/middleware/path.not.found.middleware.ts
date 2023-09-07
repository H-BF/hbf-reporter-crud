import { HTTPError } from "../../errors/custom/http-error";
import { IMiddleware } from "./midlleware.interface";
import { Request, Response, NextFunction } from "express";

export class PathNotFoundMiddleware implements IMiddleware {

    execute(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(404, `PATH: ${req.path} Not Found`))
    }
}