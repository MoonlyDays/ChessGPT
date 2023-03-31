import { MAX_CELLS, Tracer } from "../Tracer";
import { Figure } from "./Figure";

export class Bishop extends Figure
{
    constructor()
    {
        super();
        this.Name = "Bishop";
    }

    SetupDOMElement(el: HTMLElement): void 
    {
        super.SetupDOMElement(el);
        el.classList.add("bishop");
    }

    public *GenerateCellsToMove()
    {
        // Forward move.
        yield *Tracer.StartAt(this.Cell, this.Team)
            .MoveUpLeft     (MAX_CELLS).Reset()
            .MoveUpRight    (MAX_CELLS).Reset()
            .MoveDownLeft   (MAX_CELLS).Reset()
            .MoveDownRight  (MAX_CELLS).Reset()
            .YieldTracedCells();
    }
}