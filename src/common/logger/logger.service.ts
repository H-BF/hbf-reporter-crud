import { Logger, ILogObj, ISettingsParam } from 'tslog';
import { variables } from '../var_storage/variables-storage';

class LoggerService {

    private logger: Logger<ILogObj>
    private logLvl: Record<string, number> = {
        'SILLY': 0,
        'TRACE': 1,
        'DEBUG': 2,
        'INFO': 3,
        'WARN': 4,
        'ERROR': 5,
        'FATAL': 6
    }

    constructor() {

        const settings: ISettingsParam<ILogObj> = {
            type: this.validateType(variables.get("LOG_TYPE")),
            prettyLogTimeZone: 'local',
            minLevel: this.logLvl[variables.get("LOG_LVL")],
            prettyLogTemplate: '{{dd}}.{{mm}}.{{yyyy}} {{hh}}:{{MM}}:{{ss}}.{{ms}} {{logLevelName}}: '
            
        } 
        this.logger = new Logger<ILogObj>(settings)
    }

    info(msg: string) {
        this.logger.info(msg)
    }

    err(msg: string) {
        this.logger.error(msg)
    }

    warn(msg: string) {
        this.logger.warn(msg)
    }

    debug(msg: string) {
        this.logger.debug(msg)
    }

    private validateType(type: string): "json" | "pretty" | "hidden" {
        const types = ["json", "pretty", "hidden"]
        if (!types.includes(type))
            throw new Error(`He корректный тип логирования ${type}. Тип должен принадлежать ${types.join(", ")}`)
        return type as "json" | "pretty" | "hidden"
    }
}

export const logger = new LoggerService()
