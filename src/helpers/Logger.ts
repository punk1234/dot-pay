import K from "../constants";
import winston from "winston";
import config from "../config";
import "winston-daily-rotate-file";
import appRootPath from "app-root-path";

const transport = new winston.transports.DailyRotateFile({
    filename: "application-%DATE%.log",
    dirname: `${appRootPath}/logs/`,
    level: "info",
    handleExceptions: true,
    json: true,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

transport.on('rotate', function() {
    // do something fun
});


const Logger = winston.createLogger({
    transports: [ transport ]
});

if(config.ENVIRONMENT !== K.Environment.PRODUCTION) {
    Logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: "debug"
    }));
}

const LoggerStream = {
    write: (message: never) => { Logger.info(message); }
};

export { Logger, LoggerStream };