export function createProduct(body){
    const {_id} = body ?? {} //acomodar
    if (!_id) {
        throw new Error ("User ID missing!")
    }
    return {_id}
}
