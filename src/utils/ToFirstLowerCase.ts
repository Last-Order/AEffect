export { }

declare global {
    interface String {
        toFirstLowerCase(): string;
    }
}

String.prototype.toFirstLowerCase = function () {
    return (<string>this[0]).toLowerCase() + (<string>this).slice(1);
}
