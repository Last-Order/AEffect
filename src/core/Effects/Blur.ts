import Effect from './base/Effect';
/**
 * 边缘模糊 (高斯模糊)
 */
class Blur extends Effect {
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
}



export default Blur;