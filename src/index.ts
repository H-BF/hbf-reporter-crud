import { App } from "./app/app";
import { logger } from "./common/logger/logger.service";
import { variables } from "./common/var_storage/variables-storage";

(async () => {
    const app = await (new App()).start()
    const port = variables.get("APP_PORT")

    app.listen(port, () => {
        logger.info(`✅ Server started successfully on port: ${port}!`)
    })
})().catch(err => {
    logger.err(err)
})