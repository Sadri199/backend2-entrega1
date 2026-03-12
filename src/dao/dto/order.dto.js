export function formatOrder(body){
    const {code, clientName, clientEmail, products, totalPrice, status} = body ?? {}
        if (!code || !clientName || !clientEmail || !products || typeof totalPrice !== "number" || status !== "pending"){
            throw new Error ("One or more mandatory values are missing!")
        }
        return {code, clientName, clientEmail, products, totalPrice, status}
}

export function formatProductOrder(body){
    const {productId, title, productQuantity, unitPrice} = body ?? {}
        if (!productId || !title || typeof productQuantity !== "number" || typeof unitPrice !== "number"){
            throw new Error ("One or more mandatory values are missing!")
        }
        return {productId, title, productQuantity, unitPrice}
}

export function formatUpdate(body){
    const {products} = body ?? {}
        if (!products){
            throw new Error ("You need to add the products to edit in the order!")
        }
        return {products}
}

export function formatFinish(body){
    const status = body
        if (!status){
            throw new Error ("Please change the status to 'confirmed'")
        }
        return {status}
}

export function orderId(body){
    const _id = body
    if(!_id){
        throw new Error ("Order ID missing!")
    }
    return {_id}
}

export function orderEmail(body){
    const email = body
    if(!email){
        throw new Error ("Email is missing!")
    }
    return {clientEmail: email}
}

export function filterOrder(body){
    const {code, clientName, clientEmail, products, totalPrice, status, _id, createdAt} = body ?? {}
    return {code, clientName, clientEmail, products, totalPrice, status, _id, creationDate: createdAt}
}