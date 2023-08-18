import { Logger, ILogObj, ISettingsParam } from 'tslog';
import { MissEnvVariable } from '../../errors/custom/miss-env-variable';

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

        if(!process.env.LOG_LVL)
            throw new MissEnvVariable('LOG_LVL')

        if(!process.env.LOG_TYPE)
            throw new MissEnvVariable('LOG_TYPE')

        const settings: ISettingsParam<ILogObj> = {
            type: 'pretty',
            prettyLogTimeZone: 'local',
            minLevel: this.logLvl[process.env.LOG_LVL],
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
}

export const logger = new LoggerService()
