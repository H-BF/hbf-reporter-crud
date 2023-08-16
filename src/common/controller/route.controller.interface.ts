import { Request, Response, NextFunction, Router } from "express";
import { IMiddleware } from "../middleware/midlleware.interface";

export interface IControllerRoute {
    path: string,
    func: (req: Request, res: Response, next: NextFunction) => void,
    method: keyof Pick<Router, 'get' | 'post' | 'patch'>,
    middlewares?: IMiddleware[]
}