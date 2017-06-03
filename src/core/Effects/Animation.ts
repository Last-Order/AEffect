import Effect from "./base/Effect";
import Text from '../Entities/Text';

class Animation implements Effect{
    isHeadEffect = false;
    startIndex = 0;
    name = "t";

    handler(text: Text){
        return text;
    }
}