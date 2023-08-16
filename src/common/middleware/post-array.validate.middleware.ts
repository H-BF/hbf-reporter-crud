import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "./midlleware.interface";
import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from 'class-validator';
import { HTTPError } from "../../errors/custom/http-error";

export class PostArrayValidateMiddleware implements IMiddleware {

    constructor(private classToValidate: ClassConstructor<object>) { }

    async execute({ body }: Request, res: Response, next: NextFunction): Promise<void> {
        let errors: ValidationError[] = []
        for (const elem of body) {
            const instance = plainToClass(this.classToValidate, elem)
            errors = errors.concat(await validate(instance, {
                whitelist: true,
                forbidNonWhitelisted: true
            }))
        }
        if (errors.length > 0) {
            next(new HTTPError(400, {
                title: "не корректные данные в запросе",
                msg: errors
            }))
        } else {
            next()
        }
    }
}
