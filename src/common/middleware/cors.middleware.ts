import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "./midlleware.interface";
import cors, { CorsOptions } from "cors"
import { variables } from "../var_storage/variables-storage";
import { HTTPError } from "../../errors/custom/http-error";

export class CORSMiddleware implements IMiddleware {

    private corsMiddleware;

    constructor() {
        const corsOptions: CorsOptions = {
            origin: (
                origin: string | undefined,
                cb: (err: Error | null, allow?: boolean) => void
            ) => {
                const whitelist = variables.get("TRUSTED_ADDRESS").split(";")
                if (whitelist.indexOf(origin!) !== -1 || !origin) {
                    cb(null, true)
                } else {
                    cb(new HTTPError(403, `Host: ${origin} not allowed by CORS`));
                }  
            }
        }
        this.corsMiddleware = cors(corsOptions)
        this.execute = this.execute.bind(this)
    }

    execute(req: Request, res: Response, next: NextFunction) {
        this.corsMiddleware(req, res, next)
    }
}