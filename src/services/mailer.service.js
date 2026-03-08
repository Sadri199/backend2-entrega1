import nodemailer from "nodemailer"
import fs from 'fs/promises'
import path from 'path'
import Handlebars from 'handlebars'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import env from "../config/env.config.js"

const SMTP_HOST = env.SMTP_HOST
const SMTP_PORT = env.SMTP_PORT
const SMTP_SECURE = env.SMTP_SECURE
const SMTP_USER = env.SMTP_USER
const SMTP_PASS = env.SMTP_PASS
const SMTP_FROM = env.SMTP_FROM

function buildTransport (){
    if(!SMTP_HOST)
        throw new Error("Host undefined!")
    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT || 587),
        secure: String(SMTP_SECURE || "false") === "true",
        auth: {user: SMTP_USER, pass: SMTP_PASS}
    })
}

async function renderTemplate(name, data) {
    const folder = path.join(__dirname, "../views/emails")
    const filePath = path.join(folder, `${name}.handlebars`)
    if(!filePath){
        throw new Error ("Email Template doesn't exists with that name!")
    }
    const source = await fs.readFile(filePath, "utf-8")
    const template = Handlebars.compile(source)
    return template(data || {})
}

export class MailerService{
    async send ({to, subject, template, context = {}}){
        if(!to || !subject || !template) throw new Error("Mandatory fields missing!")
        const transport = buildTransport()
        const html = await renderTemplate(template, context)
        const info = await transport.sendMail({
            from: SMTP_FROM || SMTP_USER,
            to,
            subject,
            html
        })
        return {messageId: info.messageId, accepted: info.accepted, rejected:info.rejected}
    }
}

export const mailerService = new MailerService()
