export const config = {
    debug: process.env.APP_DEBUG === "true",
    logLevel: process.env.LOG_LEVEL || "info",
}