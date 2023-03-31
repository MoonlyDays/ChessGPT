import { MAX_CELLS, Tracer } from "../Tracer";
import { Figure } from "./Figure";

export class Queen extends Figure
{
    public *GenerateCellsToMove()
    {
        // Forward move.
        yield *Tracer.StartAt(this.Cell, this.Team)
            .MoveUp         (MAX_CELLS).Reset()
            .MoveDown       (MAX_CELLS).Reset()
            .MoveLeft       (MAX_CELLS).Reset()
            .MoveRight      (MAX_CELLS).Reset()
            .MoveUpLeft     (MAX_CELLS).Reset()
            .MoveUpRight    (MAX_CELLS).Reset()
            .MoveDownLeft   (MAX_CELLS).Reset()
            .MoveDownRight  (MAX_CELLS).Reset()
            .YieldTracedCells();
    }
}