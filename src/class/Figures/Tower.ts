import { MAX_CELLS, Tracer } from "../Tracer";
import { Figure } from "./Figure";

export class Tower extends Figure
{
    public *GenerateCellsToMove()
    {
        // Forward move.
        yield *Tracer.StartAt(this.Cell, this.Team)
            .MoveUp         (MAX_CELLS).Reset()
            .MoveDown       (MAX_CELLS).Reset()
            .MoveLeft       (MAX_CELLS).Reset()
            .MoveRight      (MAX_CELLS).Reset()
            .YieldTracedCells();
    }
}