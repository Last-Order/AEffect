import Dialogue from './Entities/Dialogue';
import Style from './Entities/Style';
import MetaInfo from './Entities/MetaInfo';
import '../utils/Explode';
import '../utils/ToFirstLowerCase';
export interface ParseResult {
    metaInfo: MetaInfo;
    dialogs: Dialogue[];
    styles: {
        [index: string]: Style;
    };
}
declare var _default: {
    parse(content: string, options?: {}): ParseResult;
};
export default _default;
