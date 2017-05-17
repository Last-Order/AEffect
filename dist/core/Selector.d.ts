import AEffect from '../AEffect';
import Dialogue from './Entities/Dialogue';
declare class Selector {
    static select(AE: AEffect, condition: object): Dialogue[];
    static selectByStyle(dialog: Dialogue, style: any): boolean;
    static selectByName(dialog: Dialogue, name: any): boolean;
}
export default Selector;
