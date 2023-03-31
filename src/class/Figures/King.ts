import { Tracer } from "../Tracer";
import { Figure } from "./Figure";

export class King extends Figure
{
    public *GenerateCellsToMove()
    {
        // Forward move.
        yield *Tracer.StartAt(this.Cell, this.Team)
            .MoveUp         ().Reset()
            .MoveDown       ().Reset()
            .MoveLeft       ().Reset()
            .MoveRight      ().Reset()
            .MoveUpLeft     ().Reset()
            .MoveUpRight    ().Reset()
            .MoveDownLeft   ().Reset()
            .MoveDownRight  ().Reset()
            .YieldTracedCells();
    }
}