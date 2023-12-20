import { direction_type, assertion_status, protocol, traffic } from "@prisma/client"

export interface IAssertions {
    launchUUID?: string
    srcIp?: string
    srcPort?: string
    dstIp?: string
    dstPort?: string
    protocol?: protocol
    from?: string
    to?: string
    fromType?: direction_type
    toType?: direction_type
    status?: assertion_status
    msgErr?: string
    icmpType?: string
    icmpCommand?: string
    testName?: string
    traffic?: traffic
}

export class Assertions {

    private _launchUuid?: string
    private _srcIp?: string
    private _srcPort?: string
    private _dstIp?: string
    private _dstPort?: string
    private _protocol?: protocol
    private _from?: string
    private _to?: string
    private _fromType?: direction_type
    private _toType?: direction_type
    private _status?: assertion_status
    private _msgErr?: string
    private _icmpType?: string
    private _icmpCommand?: string
    private _testName?: string
    private _traffic?: traffic

    constructor(data: IAssertions) {
        this._launchUuid = data.launchUUID
        this._srcIp = data.srcIp
        this._srcPort = data.srcPort
        this._dstIp = data.dstIp
        this._dstPort = data.dstPort
        this._protocol = data.protocol
        this._from = data.from
        this._to = data.to
        this._fromType = data.fromType
        this._toType = data.toType
        this._status = data.status
        this._msgErr = data.msgErr
        this._icmpType = data.icmpType
        this._icmpCommand = data.icmpCommand
        this._testName = data.testName
        this._traffic = data.traffic
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

    public get from(): string | undefined {
        return this._from
    }

    public set from(from: string) {
        this._from = from
    }

    public get to(): string | undefined {
        return this._to
    }

    public set to(to: string) {
        this._to = to
    }

    public get fromType():  direction_type | undefined {
        return this._fromType
    }

    public set fromType(fromType: direction_type) {
        this._fromType = fromType
    }

    public get toType():  direction_type | undefined {
        return this._toType
    }

    public set toType(toType: direction_type) {
        this._toType = toType
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

    public set icmpType(icmpType: string) {
        this._icmpType = icmpType
    }

    public get icmpType(): string | undefined {
        return this._icmpType
    }

    public set icmpCommand(icmpCommand: string) {
        this._icmpCommand = icmpCommand
    }

    public get icmpCommand(): string | undefined {
        return this._icmpCommand
    }

    public get testName(): string | undefined {
        return this._testName 
    }

    public set testName(testName: string) {
        this._testName = testName
    }

    public get traffic(): traffic | undefined {
        return this._traffic
    }

    public set traffic(traffic: traffic) {
        this._traffic = traffic
    }
}