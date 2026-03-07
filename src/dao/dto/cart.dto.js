export function getOrCreateCart(body){
    const {_id} = body ?? {}
    if (!_id) {
        throw new Error ("User ID missing!")
    }
    return {_id}
}
