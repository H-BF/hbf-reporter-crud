import { assertions } from "@prisma/client"
import { AssertionsCreateDto } from "../dto/assertions.create.dto"
import { AssertionsFindWhereDto } from "../dto/assertions.find-where.dto"

export interface IAssertionsService {
    create(dto: AssertionsCreateDto): Promise<assertions>
    createAll(dto: AssertionsCreateDto[]): Promise<number>
    getAllWhere(dto: AssertionsFindWhereDto): Promise<{totalRows: number, assertions: assertions[] | []}>
}