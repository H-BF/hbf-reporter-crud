
export interface ILaunchError {
    launchUUID: string
    message: string
}

export class LaunchError {

    private _launchUUID: string
    private _message: string

    constructor(data: ILaunchError) {
        this._launchUUID = data.launchUUID
        this._message = data.message
    }

    public get launchUUID(): string {
        return this._launchUUID
    }

    public set launchUUID(value: string) {
        this._launchUUID = value
    }

    public get message(): string {
        return this._message
    }
    public set message(value: string) {
        this._message = value
    }
}