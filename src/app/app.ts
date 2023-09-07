import swaggerUi, { JsonObject } from 'swagger-ui-express';
import express, { Application, Request, Response, NextFunction } from "express"
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
import { HTTPError } from "../errors/custom/http-error";
import { CORSMiddleware } from '../common/middleware/cors.middleware';
import { PathNotFoundMiddleware } from '../common/middleware/path.not.found.middleware';

export class App {

    private app: Application
    private path: string

    constructor() {
        this.app = express()
        this.app.use(bodyParser.json())
        this.path = `/${variables.get("INGRESS_PATH")}/${variables.get("API_VERSION")}`
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

        // Добавлям правила для CORS
        this.app.use(new CORSMiddleware().execute)

        //Инициализируем и привязываем контроллеры
        this.app.use(this.path, new LaunchController(launchSvc).router)
        this.app.use(this.path, new LaunchErrorController(launchErrSvc).router)
        this.app.use(this.path, new AssertionsController(assertionSvc).router)

        if(variables.get("STAGE") === "dev") {
            this.app.use(`${this.path}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerTemplate({
                host: variables.get("INGRESS_NAME"),
                port: variables.get("INGRESS_PORT")
            }) as unknown as JsonObject))
        }

        //Обработка несуществующих path
        this.app.use(new PathNotFoundMiddleware().execute)

        //Биндим обработчик ошибок
        const exf = new ExceptionFilter()
        this.app.use(exf.catch.bind(exf))

        return this.app
    }
}