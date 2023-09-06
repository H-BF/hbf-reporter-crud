import swaggerUi, { JsonObject } from 'swagger-ui-express';
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
import { variables } from '../common/var_storage/variables-storage';
import { swaggerTemplate } from '../swagger.template';

export class App {

    private app: Application

    constructor() {
        this.app = express()
        this.app.use(bodyParser.json())
    }

    async start(): Promise<Application> {

        const client = new PrismaService()
        await client.connect()

        //Инициализируеми репозитории
        const launchRepo = new LaunchRepository(client)
        const launchErrRepo = new LaunchErrorRepository(client)
        const assertionRepo = new AssertionsRepository(client)

        //Инициализируем сервисы
        const launchSvc = new LaunchService(launchRepo)
        const launchErrSvc = new LaunchErrorService(launchErrRepo)
        const assertionSvc = new AssertionsService(assertionRepo)

        //Инициализируем и привязываем контроллеры
        this.app.use('/hbf/v1', new LaunchController(launchSvc).router)
        this.app.use('/hbf/v1', new LaunchErrorController(launchErrSvc).router)
        this.app.use('/hbf/v1', new AssertionsController(assertionSvc).router)

        const exf = new ExceptionFilter()
        this.app.use(exf.catch.bind(exf))

        if(variables.get("STAGE") === "dev") {
            this.app.use('/hbf/docs', swaggerUi.serve, swaggerUi.setup(swaggerTemplate({
                host: variables.get("INGRESS_NAME"),
                port: variables.get("INGRESS_PORT")
            }) as unknown as JsonObject))
        }

        return this.app
    }
}