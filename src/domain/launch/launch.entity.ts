import { launch_status } from '@prisma/client'

export interface ILaunch {
    pipeline?: string
    job?: string
    srcBranch?: string
    dstBranch?: string
    commit?: string
    failCount?: number
    passCount?: number
    duration?: number
    hbfTag?: string
    status?: launch_status
}

export class Launch {

    private _pipeline?: string
    private _job?: string
    private _srcBranch?: string
    private _dstBranch?: string
    private _commit?: string
    private _failCount?: number
    private _passCount?: number
    private _duration?: number
    private _hbfTag?: string
    private _status?: launch_status

    constructor(data: ILaunch) {
        this._pipeline = data.pipeline
        this._job = data.job
        this._srcBranch = data.srcBranch
        this._dstBranch = data.dstBranch
        this._commit = data.commit
        this._failCount = data.failCount
        this._passCount = data.passCount
        this._duration = data.duration
        this._hbfTag = data.hbfTag
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

    public get dstBranch(): string | undefined {
        return this._dstBranch
    }
    public set dstBranch(value: string | undefined) {
        this._dstBranch = value
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

    public get hbfTag(): string | undefined {
        return this._hbfTag
    }
    public set hbfTag(value: string | undefined) {
        this._hbfTag = value
    }
}