import dotenv from 'dotenv'
dotenv.config()

const env = {
    NODE_ENV : process.env.NODE_ENV || "development",
    PORT : parseInt(process.env.PORT || "8000", 10),
    MONGO_TARGET: process.env.MONGO_TARGET || 'LOCAL',
    MONGO_URL: process.env.MONGO_URL || '',
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL || '',
    SECRET_SESSION: process.env.SECRET_SESSION || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM
}

export function checkEnv() {
    const requiredValues = []

    if(!env.SECRET_SESSION) requiredValues.push("SECRET_SESSION")
    if(!env.JWT_SECRET) requiredValues.push("JWT_SECRET")
    if(env.MONGO_TARGET === 'LOCAL' && !env.MONGO_URL) requiredValues.push("MONGO_URL")
    if(env.MONGO_TARGET === 'ATLAS' && !env.MONGO_ATLAS_URL) requiredValues.push("MONGO_ATLAS_URL")
    if(requiredValues.length){
        console.error(`Mandatory Environment Variables are missing: ` , missing.join(', '));
        process.exit(1);
    } else {
        console.log("🚀 ~ All Environment Variables are configured correctly  ~ 🚀")
    }
}

export default env