import Dialogue from '../core/Entities/Dialogue';
import Time from '../core/Entities/Time';

export type TimePoint =
    'LineStart' | 'LineEnd' | 'LineMiddle' | 'SyllableStart' | 'SyllableEnd' | 'SyllableMiddle';
export type TimePointFunction =
    /**
     * @param dialog 对话行
     * @param syllableStart 音节开始
     * @param syllableEnd 音节结束
     */
    (dialog: Dialogue, syllableStart: Time, syllableEnd: Time) => number;
