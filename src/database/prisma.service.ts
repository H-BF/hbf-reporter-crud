import { Prisma, PrismaClient } from "@prisma/client";
import { logger } from "../common/logger/logger.service";
import { LogLevel } from "@prisma/client/runtime/library";

export class PrismaService {

    public client: PrismaClient

    constructor() {
        this.client = new PrismaClient({
            log: [{
                emit: 'event',
                level: 'query'
              }, {
                emit: 'event',
                level: 'error'
              }]
        })

        this.client.$on('query' as never, (event: Prisma.QueryEvent) => {
            const query = event.query
            const params: string[] = JSON.parse(event.params)
            const result = params.reduce((acc, param, index) => {
                return acc.replace(`$${index + 1}`, String(param));
              }, query);
              logger.debug(result)
        })

        this.client.$on('error' as never, (e: Prisma.LogEvent) => {
            logger.debug(e.message)
        })
    }

    async connect(): Promise<void> {
        await this.client.$connect().then(() => {
            logger.info('✅ PostgreSQL Connection has been established successfully.')
        }).catch(err => {
            logger.err(`❌ Unable to connect to the PostgreSQL database: ${err}`)
            process.exit(1)
        })
    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect()
    }
}