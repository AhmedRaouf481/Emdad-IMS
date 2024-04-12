export const removeEmptyKeys = (object: Record<string, any>) => {
    Object.keys(object).forEach(key => {
        if (object[key] == null || object[key] === "") {
            delete object[key];
        }
    })
    return object
}
