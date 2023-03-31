import { Tracer } from "../Tracer";
import { Vector2 } from "../Util/Vector";
import { Figure } from "./Figure";

export class Knight extends Figure
{
    constructor()
    {
        super();
        this.Name = "Knight";
    }

    SetupDOMElement(el: HTMLElement): void 
    {
        super.SetupDOMElement(el);
        el.classList.add("knight");
    }

    public *GenerateCellsToMove()
    {
        for(var i = 0; i < 4; i++)
        {
            var ang = Math.PI * i / 2;
            var x = Math.round(Math.cos(ang));
            var y = Math.round(Math.sin(ang));
            var fwd = new Vector2(x, y);

            var toRight = new Vector2(y, -x);
            var trR = Tracer.StartAt(this.Cell, this.Team)
                .WithCollisions(false)
                .Move(fwd.Scale(2))
                .Move(toRight);

            yield *this.GetCellsFromCurvedTrace(trR);

            var toLeft = new Vector2(-y, x);
            var trL = Tracer.StartAt(this.Cell, this.Team)
                .WithCollisions(false)
                .Move(fwd.Scale(2))
                .Move(toLeft);

            yield *this.GetCellsFromCurvedTrace(trL);
        }
    }

    public *GetCellsFromCurvedTrace(trace: Tracer)
    {
        if(trace.Error)
            return;

        var cell = trace.Cell;
        if(cell.Figure)
        {
            if(cell.Figure.Team == this.Team)
                return;
        }

        yield cell;
    }
}