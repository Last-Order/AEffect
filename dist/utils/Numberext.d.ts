export {  };
declare global  {
    interface Number {
        checkBound(min: number, max: number): number;
    }
}
