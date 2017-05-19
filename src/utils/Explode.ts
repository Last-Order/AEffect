export { }

declare global {
    interface String {
        explode(separator: string, limit: number): string[];
    }
}


String.prototype.explode = function (separator: string, limit: number) {
    let arr = this.split(separator);
    arr.push(arr.splice(limit - 1).join(separator));
    return arr;
}
