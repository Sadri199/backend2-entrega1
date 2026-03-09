export function formatCreate(body){
    const {title, description, price, status, stock, category, thumbnail} = body ?? {}
        if (!title || !description || typeof price !== "number" || typeof status !== "boolean" || typeof stock !== "number" || !category){
            throw new Error ("One or more mandatory values are missing!")
        }
        return {title, description, price, status, stock, category, thumbnail}
}
