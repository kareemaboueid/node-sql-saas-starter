import winston from "winston";
import environment from "./environment.cfg.js";

// Custom format to handle error objects
const enumerate_error_format = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

/**
 * Logger configuration using Winston.
 * @memberof configs
 * @description Configures the Winston logger with appropriate formats and transports.
 */
const logger = winston.createLogger({
  level: environment.node_env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerate_error_format(),
    environment.node_env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
