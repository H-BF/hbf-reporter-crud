import { App } from "./app/app";
import { logger } from "./common/logger/logger.service";
import { MissEnvVariable } from "./errors/custom/miss-env-variable";

(async () => {
    if (!process.env.APP_PORT)
        throw new MissEnvVariable("APP_PORT")

    const app = await (new App()).start()

    app.listen(process.env.APP_PORT, () => {
        logger.info("✅ Server started successfully!")
    })
})().catch(err => {
    logger.err(err)
})