import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import url from "url";

// Get the directory name of the current module
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Define a schema for environment variables validation using Joi
const environment_variables_schema = Joi.object()
  .keys({
    // NODE_ENV Key:
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),

    // PORT Key:
    PORT: Joi.number().default(5000),

    // DATABASE_URL Key:
    DATABASE_URL: Joi.string().required(),

    // JWT_SECRET Key:
    JWT_SECRET: Joi.string().required(),

    // JWT Expiration Keys:
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(15),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(7),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(30),
    JWT_INVITATION_EXPIRATION_HOURS: Joi.number().default(48),

    // SMTP Configuration Keys:
    SMTP_HOST: Joi.string().allow(""),
    SMTP_PORT: Joi.number(),
    SMTP_USERNAME: Joi.string().allow(""),
    SMTP_PASSWORD: Joi.string().allow(""),
    EMAIL_FROM: Joi.string().allow(""),

    // Application URL Key:
    APP_URL: Joi.string().default("http://localhost:3000"),
  })
  .unknown();

// Validate environment variables against the schema
const { value: variable, error } = environment_variables_schema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Configuration validation error: ${error.message}`);
}

/**
 * Environment configuration object
 * @memberof configs
 */
const environment = {
  node_env: variable.NODE_ENV,
  port: variable.PORT,
  database: { url: variable.DATABASE_URL },
  jwt: {
    secret: variable.JWT_SECRET,
    access_expiration_minutes: variable.JWT_ACCESS_EXPIRATION_MINUTES,
    refresh_expiration_days: variable.JWT_REFRESH_EXPIRATION_DAYS,
    reset_password_expiration_minutes:
      variable.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    invitation_expiration_hours: variable.JWT_INVITATION_EXPIRATION_HOURS,
  },
  email: {
    host: variable.SMTP_HOST,
    port: variable.SMTP_PORT,
    user: variable.SMTP_USERNAME,
    pass: variable.SMTP_PASSWORD,
    from: variable.EMAIL_FROM,
  },
  app_url: variable.APP_URL,
};

export default environment;
