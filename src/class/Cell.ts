import { Board } from "./Board";
import { g_Globals } from "./Chess";
import { ETeam } from "./Constants";
import { DOMEntity } from "./DOMEntity";
import { Figure } from "./Figures/Figure";

export class Cell extends DOMEntity
{
    Team: ETeam;
    Address: string;
    get Position() { return Board.AddressToPosition(this.Address); }
    Figure: Figure;
    SelectedCanMoveToThis = false;

    constructor()
    {
        super();

        this.BindClass("white", () => this.Team == ETeam.White );
        this.BindClass("black", () => this.Team == ETeam.Black );
        this.BindClass("highlight", () => this.SelectedCanMoveToThis);
    }

    SetupDOMElement(el: HTMLElement): void
    {
        el.classList.add("cell");
    }

    SetHighlightForSelection(val: boolean)
    {
        this.SelectedCanMoveToThis = val;
    }

    OnClick(ev: MouseEvent): void
    {
        if(!this.SelectedCanMoveToThis)
            return;

        var figure = g_Globals.Game.Board.SelectedFigure;
        figure.MoveToCell(this);
        g_Globals.Game.Board.ClearSelection();
    }
}