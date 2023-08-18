import { launch_status } from '@prisma/client'

export interface ILaunch {
    pipeline?: string
    job?: string
    failCount?: number
    passCount?: number
    duration?: number
    status?: launch_status
}

export class Launch {

    private _pipeline?: string
    private _job?: string
    private _failCount?: number
    private _passCount?: number
    private _duration?: number
    private _status?: launch_status

    constructor(data: ILaunch) {
        this._pipeline = data.pipeline
        this._job = data.job
        this._failCount = data.failCount
        this._passCount = data.passCount
        this._duration = data.duration
        this._status = data.status

    }

    public get pipeline(): string | undefined {
        return this._pipeline
    }

    public set pipeline(pipline: string) {
        this._pipeline = pipline
    }

    public get job(): string | undefined {
        return this._job
    }

    public set job(job: string) {
        this._job = job
    }

    public get failCount(): number | undefined {
        return this._failCount
    }

    public set failCount(value: number) {
        this._failCount = value
    }

    public get status(): launch_status | undefined {
        return this._status
    }

    public set status(value: launch_status) {
        this._status = value
    }

    public get passCount(): number | undefined {
        return this._passCount
    }

    public set passCount(value: number) {
        this._passCount = value
    }

    public get duration(): number | undefined {
        return this._duration
    }

    public set duration(value: number) {
        this._duration = value
    }
}