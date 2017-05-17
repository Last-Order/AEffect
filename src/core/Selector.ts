import AEffect from '../AEffect';

import Dialogue from './Entities/Dialogue';

class Selector{
    static select(AE:AEffect, condition: object){
        let dialogs = AE.dialogs;
        for (let key of Object.keys(condition)){
            dialogs = dialogs.filter((dialog) => {
                return Selector[`selectBy${key[0].toUpperCase() + key.slice(1)}`](dialog, condition[key])
            });
        }
        return dialogs;
    }
    static selectByStyle(dialog: Dialogue, style){
        return dialog.style.name === style;
    }
    static selectByName(dialog: Dialogue, name){
        return dialog.name === name;
    }
}

export default Selector;