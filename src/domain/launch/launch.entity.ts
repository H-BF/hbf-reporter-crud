import { launch_status } from '@prisma/client'

export interface ILaunch {
    pipeline?: string
    job?: string
    srcBranch?: string
    commit?: string
    failCount?: number
    passCount?: number
    duration?: number
    tag?: string
    status?: launch_status
    serviceName?: string
}

export class Launch {

    private _pipeline?: string
    private _job?: string
    private _srcBranch?: string
    private _commit?: string
    private _failCount?: number
    private _passCount?: number
    private _duration?: number
    private _tag?: string
    private _status?: launch_status
    private _serviceName?: string

    constructor(data: ILaunch) {
        this._pipeline = data.pipeline
        this._job = data.job
        this._srcBranch = data.srcBranch
        this._commit = data.commit
        this._failCount = data.failCount
        this._passCount = data.passCount
        this._duration = data.duration
        this._tag = data.tag
        this._status = data.status
        this._serviceName = data.serviceName
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

    public get srcBranch(): string | undefined {
        return this._srcBranch
    }

    public set srcBranch(value: string | undefined) {
        this._srcBranch = value
    }

    public get commit(): string | undefined {
        return this._commit
    }

    public set commit(value: string | undefined) {
        this._commit = value
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

    public get tag(): string | undefined {
        return this._tag
    }
    public set tag(value: string | undefined) {
        this._tag = value
    }

    public get serviceName(): string | undefined {
        return this._serviceName
    }

    public set serviceName(value: string) {
        this._serviceName = value
    }
}