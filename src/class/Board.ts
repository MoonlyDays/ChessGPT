import { Cell } from "./Cell";
import { g_Globals } from "./Chess";
import { ChessGPT } from "./ChessGPT";
import { ETeam } from "./Constants";
import { DOMEntity } from "./DOMEntity";
import { Bishop } from "./Figures/Bishop";
import { Figure } from "./Figures/Figure";
import { King } from "./Figures/King";
import { Knight } from "./Figures/Knight";
import { Pawn } from "./Figures/Pawn";
import { Queen } from "./Figures/Queen";
import { Tower } from "./Figures/Tower";
import { SelectionBox } from "./SelectionBox";
import { List } from "./Util/List";
import { Vector2 } from "./Util/Vector";

export class Board extends DOMEntity
{
    private _CellByAddress = new Map<string, Cell>();
    private _Figures = new List<Figure>();

    public Turn = ETeam.White;
    public SelectionBox = new SelectionBox();
    public GPT = new ChessGPT();

    constructor()
    {
        super();
        this.CreateFieldCells();
        this.DOMElement.appendChild(this.SelectionBox.DOMElement);
    }

    SetupDOMElement(el: HTMLElement): void {
        el.classList.add("field");
    }

    CreateFieldCells()
    {
        for(var i = 0; i < 8; i++)
        {
            for(var j = 0; j < 8; j++)
            {
                var cell = new Cell();
                cell.Team = ((i + j) % 2 == 0) ? ETeam.White : ETeam.Black;
                this.DOMElement.append(cell.DOMElement);

                var address = Board.PositionToAddress(new Vector2(j, i));
                cell.Address = address;
                this._CellByAddress.set(address, cell);
            }
        }
    }

    ResetBoard()
    {
        this.ClearBoard();

        //-------------------------------------
        // Black Row
        this.CreateFigureAtAddress(Tower,   ETeam.Black, "A8");
        this.CreateFigureAtAddress(Knight,  ETeam.Black, "B8");
        this.CreateFigureAtAddress(Bishop,  ETeam.Black, "C8");
        this.CreateFigureAtAddress(King,    ETeam.Black, "D8");
        this.CreateFigureAtAddress(Queen,   ETeam.Black, "E8");
        this.CreateFigureAtAddress(Bishop,  ETeam.Black, "F8");
        this.CreateFigureAtAddress(Knight,  ETeam.Black, "G8");
        this.CreateFigureAtAddress(Tower,   ETeam.Black, "H8");

        for(var i = 0; i < 8; i++)
            this.CreateFigureAtPosition(Pawn, ETeam.Black, new Vector2(i, 1));

        //-------------------------------------
        // White Row
        this.CreateFigureAtAddress(Tower,   ETeam.White, "A1");
        this.CreateFigureAtAddress(Knight,  ETeam.White, "B1");
        this.CreateFigureAtAddress(Bishop,  ETeam.White, "C1");
        this.CreateFigureAtAddress(King,    ETeam.White, "D1");
        this.CreateFigureAtAddress(Queen,   ETeam.White, "E1");
        this.CreateFigureAtAddress(Bishop,  ETeam.White, "F1");
        this.CreateFigureAtAddress(Knight,  ETeam.White, "G1");
        this.CreateFigureAtAddress(Tower,   ETeam.White, "H1");

        for(var i = 0; i < 8; i++)
            this.CreateFigureAtPosition(Pawn, ETeam.White, new Vector2(i, 6));
    }

    ClearBoard()
    {
        for(var fig of this._Figures)
            fig.Destroy();
    }

    GetCellByAddress(address: string): Cell
    {
        return this._CellByAddress.get(address);
    }

    GetCellByPosition(pos: Vector2): Cell
    {
        var address = Board.PositionToAddress(pos);
        return this.GetCellByAddress(address);
    }

    CreateFigureAtAddress(type: new () => Figure, team: ETeam, address: string)
    {
        var fig = new type();
        var cell = this.GetCellByAddress(address);
        if(!cell)
        {
            console.warn(`CreateFigureAtAddress -- Cell ${address} doesn't exit.`);
            return;
        }

        fig.MoveToCell(cell);
        fig.Team = team;
        return fig;
    }

    CreateFigureAtPosition(type: new () => Figure, team: ETeam, pos: Vector2)
    {
        return this.CreateFigureAtAddress(type, team, Board.PositionToAddress(pos));
    }

    public static PositionToAddress(pos: Vector2)
    {
        var address = String.fromCharCode(65 + pos.X);
        address += `${8 - pos.Y}`;
        return address;
    }

    public static AddressToPosition(address: string)
    {
        var h = address.charCodeAt(0) - 65;
        var v = 8 - Number(address[1]);
        return new Vector2(h, v);
    }

    CanPlayerMove() { return this.Turn == ETeam.White; }
    CanBotMove()    { return this.Turn == ETeam.Black; }

    SelectedFigure: Figure;
    TrySelect(figure: Figure)
    {
        if(!this.CanPlayerMove())
            return;

        if(!figure.IsOwnedByPlayer())
            return;

        this.ClearSelection();
        this.SelectedFigure = figure;
        this.SelectionBox.MoveTo(figure);
        figure.FindValidCellsToMove();

        g_Globals.Game.Board.GPT.StartConversation();
    }

    ClearSelection()
    {
        this.SelectedFigure = null;
        g_Globals.Game.InvokeMethodOnEntitiesOfType(Cell, x => x.SetHighlightForSelection, false);
    }
}