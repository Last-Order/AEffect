import Dialogue from './Dialogue';

export class NoParentDialogError extends Error { }
/**
 * 音节 由对话行经过音节化产生
 */
class Syllable extends Dialogue {
    /* 音节化后原句 */
    parentDialog: Dialogue;
    /* 音节化后在原句中的位置 */
    syllableIndex: number = 0;
    /* 音节本身长度 单位毫秒 */
    syllableDuration: number = 0;

    static cloneFromDialog(dialog: Dialogue): Syllable {
        const clonedDialog =
            new Syllable({ ...dialog.properties }, { ...dialog.styleMap }, { ...dialog.metaInfo });
        clonedDialog.text = clonedDialog.text.clone();
        return clonedDialog;
    }

    get lineLeft() {
        if (!this.parentDialog) {
            throw new NoParentDialogError('音节未附属于任何对话行');
        }
        return this.parentDialog.lineLeft;
    }

    get lineRight() {
        if (!this.parentDialog) {
            throw new NoParentDialogError('音节未附属于任何对话行');
        }
        return this.parentDialog.lineRight;
    }

    get lineStart() {
        if (!this.parentDialog) {
            throw new NoParentDialogError('音节未附属于任何对话行');
        }
        return this.parentDialog.lineStart;
    }

    get lineEnd() {
        if (!this.parentDialog) {
            throw new NoParentDialogError('音节未附属于任何对话行');
        }
        return this.parentDialog.lineEnd;
    }
}

export default Syllable;
