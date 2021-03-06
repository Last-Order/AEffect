export {};

declare global{
    interface Number{
        checkBound(min: number, max: number): number;
    }
}

Number.prototype.checkBound = function (min: number, max: number) {
    if (min > max) {
        throw new RangeError('min number should small than max number.');
    }
    if (this.valueOf() >= max) {
        return max;
    }
    if (this.valueOf() <= min) {
        return min;
    }
    return this.valueOf();
};
