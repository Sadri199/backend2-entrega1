import mongoose from "mongoose"
import env from '../env.config.js'

const URL = env.MONGO_URL

export const dbConnection = async () => {
    try {
        await mongoose.connect(URL, {serverSelectionTimeoutMS: 10000})
        console.log(`Connection to Database succesful! 🦾`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
