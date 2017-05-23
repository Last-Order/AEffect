import Effect from './base/Effect';

class UnknownEffect extends Effect{
    constructor(effectText: string){
        super();
        let effectName = effectText.match(/([a-zA-Z]+)/ig)[0];
    }
}