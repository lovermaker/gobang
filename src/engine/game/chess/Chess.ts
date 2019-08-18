import ChessType from "./ChessType"
import Position from "./Position";

class Chess {
   type: ChessType
   position: Position
   constructor(type: ChessType, position: Position){
       this.type = type
       this.position = position;
   }
}

export default Chess