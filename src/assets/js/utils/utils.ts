export function arrayEquals(a:any, b:any) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export default class NotImplementedError extends Error {
    constructor(message:any) {
        super(message);
        this.name = 'NotImplementedError'
    }
}