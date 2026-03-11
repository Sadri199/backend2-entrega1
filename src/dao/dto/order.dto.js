export function formatOrder(body){
    //editar
    const {title, description, price, code, status, stock, category, thumbnail} = body ?? {}
        if (!title || !description || !code || typeof price !== "number" || typeof status !== "boolean" || typeof stock !== "number" || !category){
            throw new Error ("One or more mandatory values are missing!")
        }
        return {title, description, code, price, status, stock, category, thumbnail}
}
