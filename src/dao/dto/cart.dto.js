export function createCart(body){
    const {_id} = body ?? {}
    if (!_id) {
        throw new Error ("User ID missing!")
    }
    return {_id}
}
