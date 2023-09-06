import { assertions } from "@prisma/client";
import { AssertionsCreateDto } from "./dto/assertions.create.dto";
import { AssertionsFindWhereDto } from "./dto/assertions.find-where.dto";
import { IAssertionsService } from "./interfaces/assertions.service.interface";
import { AssertionsRepository } from "./assertions.repository";
import { Assertions } from "./assertions.entity";

export class AssertionsService implements IAssertionsService {

    constructor(private client: AssertionsRepository) { }

    async create(dto: AssertionsCreateDto): Promise<assertions> {
        const assertion = new Assertions(dto)
        return await this.client.create(assertion)
    }

    async createAll(dto: AssertionsCreateDto[]): Promise<number> {
        let assertions: Assertions[] = []
        dto.forEach(d => {
            assertions = assertions.concat(new Assertions(d))
        })
        return await this.client.createMany(assertions)
    }

    async getAllWhere(dto: AssertionsFindWhereDto): Promise<{totalRows: number, assertions: assertions[] | []}> {
        const { offset, limit, ...data } = dto
        const where = new Assertions(data)
        const totalRows = await this.client.countAllRowsWhere(where)
        const assertions = await this.client.getAssertionsWhere(where, offset, limit)
        return {
            totalRows: totalRows,
            assertions: assertions || []
        }
    }
}