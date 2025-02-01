import winston, { http } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { config } from './config';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 4,
};
export const logger = winston.createLogger({
  levels: logLevels,
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({
      format: () => new Date().toISOString().replace('T', ' '),
    }),
    winston.format.printf(
      ({ timestamp, level, message, stack, ...meta }) =>
        `${timestamp} ${level}: ${message} ${stack || ''} ${
          Object.keys(meta).length > 0 ? JSON.stringify(meta) : ''
        } `
    )
  ),
  transports: [new winston.transports.Console()],
});
const fileRotateTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json()
  ),
});
logger.add(fileRotateTransport);
