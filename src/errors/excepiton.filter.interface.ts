import { Request, Response, NextFunction } from "express";
import { HTTPError } from "./custom/http-error";

export interface IExceptionFilter {
    catch: (error: HTTPError, req: Request, res: Response, next: NextFunction) => void
}