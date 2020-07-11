import winston from "winston";
import winstondb from "winston-mongodb";
import dotenv from "dotenv";

//  Faz a leitura do arquivo .env
dotenv.config();
const { MONGODB_URL } = process.env;

const { combine, timestamp, label, printf } = winston.format;
const { createLogger, transports, format } = winston;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: "info",
      db: MONGODB_URL,
      collection: "logs",
      capped: true,
      cappedMax: 20,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: format.combine(
    label({ label: "transactions" }),
    format.timestamp(),
    myFormat
  ),
});

export default logger;