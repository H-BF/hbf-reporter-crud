import { Prisma, PrismaClient } from "@prisma/client";
import { logger } from "../common/logger/logger.service";

export class PrismaService {

    public client: PrismaClient

    constructor() {
        this.client = new PrismaClient({
            log: [{
                emit: 'event',
                level: 'query'
            }]
        })

        this.client.$on('query' as never, async (event: Prisma.QueryEvent) => {
            const query = event.query
            const params: string[] = JSON.parse(event.params)
            const result = params.reduce((acc, param, index) => {
                return acc.replace(`$${index + 1}`, `"${String(param)}"`);
              }, query);
              logger.debug(result)
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