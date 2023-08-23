import { HTTPError } from "../errors/custom/http-error"

export function tryCatch(title: String) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value
        descriptor.value = async function(...args: any[]) {
            const next: Function = args[2]
            try {
                await originalMethod.apply(this, args)
            } catch(err) {
                if (err instanceof Error) {
                    next(new HTTPError(500, {
                        title: title,
                        msg: err.message
                    }))
                } else {
                    next(new Error(`${err}`))
                }
            }
        } 
    }
}