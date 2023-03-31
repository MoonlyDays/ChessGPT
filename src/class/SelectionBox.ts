import { g_Globals } from "./Chess";
import { DOMEntity } from "./DOMEntity";
import { Figure } from "./Figures/Figure";

export class SelectionBox extends DOMEntity
{
    constructor()
    {
        super();
        this.BindClass("visible", () => !!g_Globals.Game.Board.SelectedFigure);
    }

    SetupDOMElement(el: HTMLElement): void {
        el.classList.add("selection_box");
    }

    public MoveTo(figure: Figure)
    {
        var cell = figure.Cell;
        var pos = cell.Position;

        this.DOMElement.style.left = `${100 / 8 * pos.X}%`
        this.DOMElement.style.top = `${100 / 8 * pos.Y}%`
    }
}