import Dialogue from './Entities/Dialogue';
import Style from './Entities/Style';
import MetaInfo from './Entities/MetaInfo';
import '../utils/Explode';
import '../utils/ToFirstLowerCase';
export declare class MissingEventBlockError extends Error {
}
export declare class InvalidAssError extends Error {
}
export declare class InvalidStyleFormatDefinitionError extends Error {
}
export declare class InvalidStyleDefinitionError extends Error {
}
export declare class MissingStyleDefinitionError extends Error {
}
export declare class MissingDialogFormatDefinitionError extends Error {
}
export declare class InvalidDialogFormatDefinitionError extends Error {
}
export interface ParseResult {
    metaInfo: MetaInfo;
    dialogs: Dialogue[];
    styles: {
        [index: string]: Style;
    };
}
declare const _default: {
    parse(content: string, options?: {}): ParseResult;
};
export default _default;
