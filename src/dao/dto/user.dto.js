import bcrypt from "bcrypt"

export function createUser(body){
    const {first_name, last_name, email, age, password, role} = body ?? {}
    if (!first_name || !last_name || !email || !password || typeof age !== "number"){
        throw new Error ("One or more mandatory values are missing!")
    }

    const hash = bcrypt.hashSync(password, 10)
    return {first_name, last_name, email, age, password: hash, role}
}

export function checkEmail(body){
    const {email} = body ?? {}
    if(!email){
        throw new Error ("Email is required!")
    }
    return {email}
}

export function checkLogin(body){
    //acá tiene que validar si ingresaron credenciales
}

export function dataFilter(body){
    const {first_name, last_name, email, age, role} = body ?? {}
    const callsign = first_name + " " + last_name
    return {first_name, last_name, callsign, email, age, role}
}
