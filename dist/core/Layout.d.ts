import Dialogue from './Entities/Dialogue';
export declare class InvalidAlignmentError extends Error {
}
declare class Layout {
    /**
     * 为所有音节生成位置
     * @param dialog
     */
    static syllabify(dialog: Dialogue): void;
}
export default Layout;
