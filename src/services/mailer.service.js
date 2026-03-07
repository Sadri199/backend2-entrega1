import nodemailer from "nodemailer"

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

export async function sendEmail() {
    const info = await buildTransport().sendMail({
    from: SMTP_USER,
    to: "adrsa_15@hotmail.com",
    subject: "Hello ✔",
    html: "<b>Hello world?</b>", // HTML version of the message
  })
  console.log("mail envaido") //funciona, ahora hay que armar algo para templates o lo que sea
}
