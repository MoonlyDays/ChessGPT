import { Board } from "../Board";
import { Cell } from "../Cell";
import { g_Globals } from "../Chess";
import { ETeam } from "../Constants";
import { DOMEntity } from "../DOMEntity";

export class Figure extends DOMEntity
{
    Team: ETeam = 0;
    Cell: Cell;
    MoveTimes = 0;

    constructor()
    {
        super();

        this.BindClass("white", () => this.Team == ETeam.White );
        this.BindClass("black", () => this.Team == ETeam.Black );
        this.BindClass("clickable", () => g_Globals.Game.Board.Turn == this.Team && this.IsOwnedByPlayer());

        g_Globals.Game.Board.DOMElement.appendChild(this.DOMElement);
    }

    SetupDOMElement(el: HTMLElement): void
    {
        el.classList.add("figure");
        el.classList.add(this.constructor.name.toLowerCase());
    }

    MoveToCell(cell: Cell)
    {
        this.MoveTimes++;
        var oldCell = this.Cell;
        var newCell = cell;

        if(this.Cell)
        {
            this.Cell.Figure = null;
            this.Cell = null;
        }

        this.OnMoved(oldCell, newCell);
        g_Globals.Game.Board.OnFigureMoved(this, oldCell, newCell);

        if(cell)
        {

            this.Cell = cell;
            var contestedFigure = cell.Figure;
            contestedFigure?.Destroy();

            this.Cell.Figure = this;

            var pos = cell.Position;
            this.DOMElement.style.left = `${100 / 8 * pos.X}%`
            this.DOMElement.style.top = `${100 / 8 * pos.Y}%`
        }
    }

    public OnMoved(fromCell: Cell, toCell: Cell)
    {

    }

    OnClick(ev: MouseEvent): void {
        g_Globals.Game.Board.TrySelect(this);
    }

    public IsOwnedByPlayer()    { return this.Team == ETeam.White; }
    public IsOwnedByBot()       { return this.Team == ETeam.Black; }

    public CanMoveToCell(cell: Cell)
    {
        return false;
    }

    public *GenerateCellsToMove(): Generator<Cell> { return []; }
    public FindValidCellsToMove()
    {
        for(var cell of this.GenerateCellsToMove())
            cell.SetHighlightForSelection(true);
    }
}

export enum EDistanceType
{
    Vertical,
    Horizontal,
    Diagonal
};