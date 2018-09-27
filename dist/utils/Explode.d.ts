export {  };
declare global  {
    interface String {
        explode(separator: string, limit: number): string[];
    }
}
