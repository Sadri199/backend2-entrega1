export function formatCreate(body){
    const {title, description, price, code, status, stock, category, thumbnail} = body ?? {}
        if (!title || !description || !code || typeof price !== "number" || typeof status !== "boolean" || typeof stock !== "number" || !category){
            throw new Error ("One or more mandatory values are missing!")
        }
        return {title, description, code, price, status, stock, category, thumbnail}
}

export function getId(body){
    const {_id} = body ?? {}
    if(!_id){
        throw new Error ("_id is missing, that is a mandatory value to edit a product.")
    }
    return {_id}
}

export function formatUpdate(body){
    console.log("entro a formatUpdate")
    const {title, description, price, code, status, stock, category, thumbnail} = body ?? {}
    return {title, description, code, price, status, stock, category, thumbnail}
}

export function filterProduct(body){
    const {title, description, price, code, status, stock, category, thumbnail, _id} = body ?? {}
    return {title, description, price, code, status, stock, category, thumbnail, _id}
}