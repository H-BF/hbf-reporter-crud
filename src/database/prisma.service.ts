import { PrismaClient } from "@prisma/client";
import { logger } from "../common/logger/logger.service";

export class PrismaService {

    public client: PrismaClient

    constructor() {
        this.client = new PrismaClient()
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