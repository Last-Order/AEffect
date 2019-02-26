export {};

declare global{
    interface String{
        leftpad(length: number, fill: string): string;
    }
}

String.prototype.leftpad = function (length: number, fill: string) {
    if (fill.length !== 1) {
        throw new RangeError('fill key should be 1 character.');
    }
    return Array(Math.abs(this.length - ((length || 2) + 1))).join(fill) + this;
};
