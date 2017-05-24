import Effect from './base/Effect';
/**
 * 边缘模糊 (高斯模糊)
 */
class Blur extends Effect {
    name = "Blur";
    strength: number; 
    /**
     * @param strength 模糊强度
     * @param startIndex 起始位置
     */
    constructor(strength: number = 1, startIndex: number = 0){
        super();
        this.strength = strength;
        this.startIndex = startIndex;
    }
    
    toString(){
        return `\\blur${this.strength}`;
    }

    static parse(text: string): Blur{
        let strength = +text.match(/(\d+)/ig)[0];
        return new Blur(strength);
    }
}

export default Blur;