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

export function checkPassword(body){
    const {password} = body ?? {}
    if(!password){
        throw new Error("Password is required!")
    }
    return password
}

export function getUserById(body){
    const {_id} = body ?? {}
    if(!_id){
        throw new Error ("Invalid ID!")
    }
    return {_id}
}

export function temporalToken(body){
    const {token, expiryDate} = body ?? {}
    if(!token || !expiryDate){
        throw new Error ("Token or ExpiryDate are missing!")
    }
    const filtered = {resetToken:{
        token,
        expiryDate
    }}
    return filtered
}

export function dataFilter(body){
    const {first_name, last_name, email, age, role, _id, password} = body ?? {}
    const callsign = first_name + " " + last_name
    return {first_name, last_name, callsign, email, age, role, _id, password}
}

export function dataFilterAdmin(body){
    const {first_name, last_name, email, age, role, _id, createdAt, updatedAt} = body ?? {}
    const callsign = first_name + " " + last_name
    return {first_name, last_name, callsign, email, age, role, _id, createdAt, updatedAt}
}

export function resetPasswordData(body){
    const {first_name, last_name, _id, password, resetToken, email} = body ?? {}
    if(!_id)
        throw new Error ("UserID missing.")
    
    const callsign = first_name + " " + last_name
    return {_id, password, resetToken, email, callsign}
}

export function formatPassword(body){
    const {newPassword} = body ?? {}
    const hash = bcrypt.hashSync(String(newPassword), 10)
    return {$set: {password: hash},
        $unset: {resetToken: null}}
}