import { Cell } from "./Cell";
import { g_Globals } from "./Chess";
import { ChessGPT, EChatGPTRole } from "./ChessGPT";
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

const MSG_INTRO = "Let's play chess. Tell me your moves in pairs of cell you move from and to. You play as Black.";

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
        this.CreateFigureAtAddress(Queen,   ETeam.Black, "D8");
        this.CreateFigureAtAddress(King,    ETeam.Black, "E8");
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
        this.CreateFigureAtAddress(Queen,   ETeam.White, "D1");
        this.CreateFigureAtAddress(King,    ETeam.White, "E1");
        this.CreateFigureAtAddress(Bishop,  ETeam.White, "F1");
        this.CreateFigureAtAddress(Knight,  ETeam.White, "G1");
        this.CreateFigureAtAddress(Tower,   ETeam.White, "H1");

        for(var i = 0; i < 8; i++)
            this.CreateFigureAtPosition(Pawn, ETeam.White, new Vector2(i, 6));

        this.GPT.AddMessage(
            EChatGPTRole.System, 
            MSG_INTRO
        );
    }

    ClearBoard()
    {
        for(var fig of this._Figures)
            fig.Destroy();

        this.GPT.Reset();
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
    async TrySelect(figure: Figure)
    {
        if(!this.CanPlayerMove())
            return;

        if(!figure.IsOwnedByPlayer())
            return;

        this.ClearSelection();
        this.SelectedFigure = figure;
        this.SelectionBox.MoveTo(figure);
        figure.FindValidCellsToMove();
    }

    ClearSelection()
    {
        this.SelectedFigure = null;
        g_Globals.Game.InvokeMethodOnEntitiesOfType(Cell, x => x.SetHighlightForSelection, false);
    }

    OnFigureMoved(figure: Figure, cellFrom: Cell, cellTo: Cell)
    {
        if(!(cellFrom && cellTo))
            return;

        // If player moved a figure, add this as a message
        if(figure.IsOwnedByPlayer())
        {
            this.SendBoardStateToChatGPT();
            var capturedFigure = cellTo.Figure;

            var msg = `I move ${figure} from ${cellFrom.Address} to ${cellTo.Address}.`;
            if(capturedFigure) msg += ` (I captured your ${capturedFigure} at ${cellTo.Address})`;
            
            // To send a message to chat, we need to know both old and new cell.
            g_Globals.Game.Board.GPT.AddMessage(
                EChatGPTRole.User,
                msg
            );
        }

        this.SwitchTurns();
    }

    public SwitchTurns()
    {
        var nextTurn = this.Turn == ETeam.Black
            ? ETeam.White
            : ETeam.Black;
        
        console.log(`${ETeam[nextTurn]} turn!`);
        this.Turn = nextTurn;

        // Turn of the bot.
        if(nextTurn == ETeam.Black)
        {
            this.QueryResponseFromChatGPT();
        }
    }

    public SendBoardStateToChatGPT()
    {
        var figs = <Figure[]>(g_Globals.Game.Entities.Filter(x => x instanceof Figure));
        //figs = figs.filter(x => x.MoveTimes > 1);
        var msg = `Current pieces on the board: ${figs.map(x => `${x} at ${x.Cell.Address}`).join(", ")}`;
        this.GPT.AddMessage(EChatGPTRole.System, msg);
    }

    public async QueryResponseFromChatGPT()
    {
        var response = await this.GPT.GenerateCompletion();
        var cells = response.match(/[A-Za-z][0-9]/g);
        var fromAdr = cells[cells.length - 2].toUpperCase();
        var toAdr = cells[cells.length - 1].toUpperCase();

        var cellFrom = this.GetCellByAddress(fromAdr);
        var cellTo = this.GetCellByAddress(toAdr);
        
        if(!(cellFrom && cellTo))
        {
            this.GPT.AddMessage(
                EChatGPTRole.User,
                "The cells you provided do not exist." );

            this.QueryResponseFromChatGPT();
            return;
        }

        var figure = cellFrom.Figure;
        if(!figure)
        {
            this.GPT.AddMessage(
                EChatGPTRole.User,
                `There's no chess piece on ${fromAdr}.`);
                
            this.QueryResponseFromChatGPT();
            return;
        }

        var availableCells = Array.from(figure.GenerateCellsToMove());
        if(!availableCells.includes(cellTo))
        {
            this.GPT.AddMessage(
                EChatGPTRole.User,
                "Your last move is impossible."
                );

            this.QueryResponseFromChatGPT();
            return;
        }

        figure.MoveToCell(cellTo);
        console.log(`ChatGPT moved ${figure} from ${fromAdr} to ${toAdr}`);
    }
}