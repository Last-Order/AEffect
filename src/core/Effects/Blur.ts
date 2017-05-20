import Effect from './base/Effect';
/**
 * 边缘模糊 (高斯模糊)
 */
class Blur implements Effect {
    strength: number; 
    start: number; 
    /**
     * @param strength 模糊强度
     * @param start 起始位置
     */
    constructor(strength: number = 1, start: number = 0){
        this.strength = strength;
        this.start = start;
    }
    
    toString(){
        return `\\blur${this.strength}`;
    }
}

export default Blur;