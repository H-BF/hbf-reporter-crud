import express, { Application } from "express"
import { LaunchController } from "../domain/launch/launch.controller"
import { PrismaService } from "../database/prisma.service"
import { LaunchRepository } from "../domain/launch/launch.repository"
import { LaunchService } from "../domain/launch/launch.service"
import { ExceptionFilter } from "../errors/exception.filter"
import { LaunchErrorRepository } from "../domain/launch_error/launch-error.repository"
import { LaunchErrorService } from "../domain/launch_error/launch-error.service"
import { LaunchErrorController } from "../domain/launch_error/launch-error.controller"
import bodyParser from 'body-parser'
import { AssertionsRepository } from "../domain/assertions/assertions.repository"
import { AssertionsService } from "../domain/assertions/assertions.service"
import { AssertionsController } from "../domain/assertions/assertions.controller"

export class App {

    private app: Application

    constructor() {
        this.app = express()
        this.app.use(bodyParser.json())
    }

    async start(): Promise<Application> {

        const client = new PrismaService()
        await client.connect()

        const a = new LaunchRepository(client)
        const b = new LaunchService(a)

        const a1 = new LaunchErrorRepository(client)
        const b1 = new LaunchErrorService(a1)

        const a2 = new AssertionsRepository(client)
        const b2 = new AssertionsService(a2)

        this.app.use('/v1', new LaunchController(b).router)
        this.app.use('/v1', new LaunchErrorController(b1).router)
        this.app.use('/v1', new AssertionsController(b2).router)

        const exf = new ExceptionFilter()
        this.app.use(exf.catch.bind(exf))

        return this.app
    }
}