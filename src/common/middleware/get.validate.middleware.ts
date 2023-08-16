import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "./midlleware.interface";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from 'class-validator';
import { HTTPError } from "../../errors/custom/http-error";

export class GetValidateMiddleware implements IMiddleware {

    constructor(private classToValidate: ClassConstructor<object>) { }

    async execute({ query }: Request, res: Response, next: NextFunction): Promise<void> {
        const instance = plainToClass(this.classToValidate, query)
        const errors = await validate(instance, {
            whitelist: true,
            forbidNonWhitelisted: true
        })

        console.log(query)
        console.log(errors)

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