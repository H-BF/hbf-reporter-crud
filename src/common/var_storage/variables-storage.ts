import { MissEnvVariable } from "../../errors/custom/miss-env-variable"
import { requiredVariablesList } from "./required-variables-list"

class VariableStorage {
    
    private variables: Record<string, string> = {}

    constructor(list: string[]) {
        let errors: string[] =[]
        list.forEach(variable => {
            if (!process.env[variable]) {
                errors.push(variable)
                return
            }
            this.variables[variable] = process.env[variable]!
        })
        if(errors.length > 0)
            throw new MissEnvVariable(errors.join(", "))
    }

    get(name: string): string {
        if (!(name in this.variables))
            throw new Error(`Переменная ${name} отсутствует в хранилище`)

        return this.variables[name]
    }
}

export const variables = new VariableStorage(requiredVariablesList)