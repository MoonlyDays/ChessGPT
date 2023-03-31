import { Cell } from "../Cell";
import { g_Globals } from "../Chess";
import { ETeam } from "../Constants";
import { Tracer } from "../Tracer";
import { Figure } from "./Figure";
import { Queen } from "./Queen";

export class Pawn extends Figure
{
    constructor()
    {
        super();
        this.Name = "Pawn";
    }

    SetupDOMElement(el: HTMLElement): void 
    {
        super.SetupDOMElement(el);
        el.classList.add("pawn");
    }

    public *GenerateCellsToMove()
    {
        var maxFwdMoves = this.MoveTimes == 1 ? 2 : 1;

        yield *Tracer.StartAt(this.Cell, this.Team)
            .CanContestEnemyCells(false)
            .MoveUp(maxFwdMoves)
            .YieldTracedCells();

        // check L/R cells for cells with enemy figures
        var sideCells = Tracer.StartAt(this.Cell, this.Team)
            .MoveUpLeft().Reset()
            .MoveUpRight().Reset()
            .YieldTracedCells();

        for(var sideCell of sideCells)
        {
            if(!sideCell.Figure)
                continue;

            if(sideCell.Figure.Team == this.Team)
                continue;

            yield sideCell;
        }
    }

    public OnMoved(fromCell: Cell, toCell: Cell): void
    {
        var edgeY = this.Team == ETeam.Black ? 7 : 0;
        if(toCell.Position.Y == edgeY)
        {
            setTimeout(() => {
                g_Globals.Game.Board.CreateFigureAtAddress(Queen, this.Team, toCell.Address);
                this.Destroy();
            }, 100);
        }
    }

}
