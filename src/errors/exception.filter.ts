import { Request, Response, NextFunction } from "express";
import { IExceptionFilter } from "./excepiton.filter.interface";
import { HTTPError } from "./custom/http-error";

export class ExceptionFilter implements IExceptionFilter {

    catch(error: HTTPError, req: Request, res: Response, next: NextFunction): void {
        console.log(`Error: [${error.code}] - ${error.message}`)
        res.status(error.code).send(JSON.parse(error.message))
    };
}