export class HTTPError extends Error {

    code: number

    constructor(code: number, msg: Object) {
        super()
        this.message = JSON.stringify(msg)
        this.code = code
    }
}