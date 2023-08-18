import { assertion_status, protocol } from "@prisma/client"

export interface IAssertions {
    launchUUID?: string
    srcIp?: string
    srcPort?: string
    dstIp?: string
    dstPort?: string
    protocol?: protocol
    sgFrom?: string
    sgTo?: string
    status?: assertion_status
    msgErr?: string
}

export class Assertions {

    private _launchUuid?: string
    private _srcIp?: string
    private _srcPort?: string
    private _dstIp?: string
    private _dstPort?: string
    private _protocol?: protocol
    private _sgFrom?: string
    private _sgTo?: string
    private _status?: assertion_status
    private _msgErr?: string

    constructor(data: IAssertions) {
        this._launchUuid = data.launchUUID
        this._srcIp = data.srcIp
        this._srcPort = data.srcPort
        this._dstIp = data.dstIp
        this._dstPort = data.dstPort
        this._protocol = data.protocol
        this._sgFrom = data.sgFrom
        this._sgTo = data.sgTo
        this._status = data.status
        this._msgErr = data.msgErr
    }

    public get launchUuid(): string | undefined {
        return this._launchUuid
    }

    public set launchUuid(launchUUID: string) {
        this._launchUuid = launchUUID
    }

    public get srcIp(): string | undefined {
        return this._srcIp
    }

    public set srcIp(srcIp: string) {
        this._srcIp = srcIp
    }

    public get srcPort(): string | undefined {
        return this._srcPort
    }
    public set srcPort(srcPort: string) {
        this._srcPort = srcPort
    }

    public get dstIp(): string | undefined {
        return this._dstIp
    }

    public set dstIp(dstIp: string) {
        this._dstIp = dstIp
    }

    public get dstPort(): string | undefined {
        return this._dstPort
    }

    public set dstPort(dstPort: string) {
        this._dstPort = dstPort
    }

    public get protocol(): protocol | undefined {
        return this._protocol
    }

    public set protocol(protocol: protocol) {
        this._protocol = protocol
    }

    public get sgFrom(): string | undefined {
        return this._sgFrom
    }

    public set sgFrom(sgFrom: string) {
        this._sgFrom = sgFrom
    }

    public get sgTo(): string | undefined {
        return this._sgTo
    }

    public set sgTo(sgTo: string) {
        this._sgTo = sgTo
    }

    public get status(): assertion_status | undefined {
        return this._status
    }

    public set status(status: assertion_status) {
        this._status = status
    }

    public get msgErr(): string | undefined {
        return this._msgErr
    }

    public set msgErr(msgErr: string) {
        this._msgErr = msgErr
    }
}