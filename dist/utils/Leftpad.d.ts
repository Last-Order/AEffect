export {  };
declare global  {
    interface String {
        leftpad(length: number, fill: string): string;
    }
}
