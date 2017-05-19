import Effect from './base/Effect';
/**
 * 
 */
class Blur implements Effect {
    strength: number;
    constructor(strength: number = 1){
        this.strength = strength;
    }
    
    toString(){
        return `\\blur${this.strength}`;
    }
}