import app from "./app.js";
import logger from "./configs/logger.cfg.js";
import environment from "./configs/environment.cfg.js";

app.listen(environment.port, () => {
  try {
    logger.info(
      `server started on port ${environment.port} in ${environment.node_env} environment`
    );
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
});
