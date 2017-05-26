import Dialogue from '../core/Entities/Dialogue';
declare class Layout {
    /**
     * 为所有音节生成位置
     * @param dialog
     */
    static syllabify(dialog: Dialogue): void;
}
export default Layout;
