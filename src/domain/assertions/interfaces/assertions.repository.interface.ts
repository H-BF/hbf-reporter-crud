import { assertions } from "@prisma/client";
import { Assertions } from "../assertions.entity";

export interface IAssertionsRepository {
    create(assertion: Assertions): Promise<assertions>
    createMany(assertions: Assertions[]): Promise<number>
    getAssertionsWhere(assertion: Assertions): Promise<assertions[] | null>
}