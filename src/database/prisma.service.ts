import { PrismaClient } from "@prisma/client";

export class PrismaService {

    public client: PrismaClient

    constructor() {
        this.client = new PrismaClient()
    }

    async connect(): Promise<void> {
        await this.client.$connect().then(() => {
            console.log('✅ PostgreSQL Connection has been established successfully.')
        }).catch(err => {
            console.error("❌ Unable to connect to the PostgreSQL database:", err)
            process.exit(1)
        })
    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect()
    }
}