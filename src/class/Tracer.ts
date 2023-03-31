import { Cell } from "./Cell";
import { g_Globals } from "./Chess";
import { ETeam } from "./Constants";
import { List } from "./Util/List";
import { Vector2 } from "./Util/Vector";

export const MAX_CELLS = 8;

export class Tracer
{
    public Cell: Cell;
    public HasCollided = false;
    public TracedCells = new List<Cell>()
    private _OriginalCell: Cell;
    private _UseCollisions = true;
    private _ContestEnemyCells = true;
    private _Team = ETeam.White;
    private _TracedEnemy = false;

    public static StartAt(cell: Cell, team: ETeam) : Tracer
    {
        var t = new Tracer();
        t._OriginalCell = cell;
        t.Cell = cell;
        t._Team = team;
        return t;
    }

    public WithCollisions(val: boolean = true): Tracer
    {
        this._UseCollisions = val;
        return this;
    }

    public CanContestEnemyCells(val: boolean = true): Tracer
    {
        this._ContestEnemyCells = val;
        return this;
    }

    public MoveUp(steps: number = 1) : Tracer           { return this.Move(Vector2.Up.Scale(steps)); }
    public MoveDown(steps: number = 1) : Tracer         { return this.Move(Vector2.Down.Scale(steps)); }
    public MoveRight(steps: number = 1) : Tracer        { return this.Move(Vector2.Right.Scale(steps)); }
    public MoveLeft(steps: number = 1) : Tracer         { return this.Move(Vector2.Left.Scale(steps)); }
    public MoveUpLeft(steps: number = 1) : Tracer       { return this.Move(new Vector2(-1, 1).Scale(steps)); }
    public MoveUpRight(steps: number = 1) : Tracer      { return this.Move(new Vector2(1, 1).Scale(steps)); }
    public MoveDownLeft(steps: number = 1) : Tracer     { return this.Move(new Vector2(-1, -1).Scale(steps)); }
    public MoveDownRight(steps: number = 1) : Tracer    { return this.Move(new Vector2(1, -1).Scale(steps)); }

    public Move(steps: Vector2) : Tracer
    {
        if(this.HasCollided)
            return this;

        var myPos = this.Cell.Position;
        var dir = Vector2.Zero;
        if(steps.X != 0) dir.X = steps.X / Math.abs(steps.X);
        if(steps.Y != 0) dir.Y = steps.Y / Math.abs(steps.Y);
        if(dir.Length == 0) return this;

        var absDir = dir.Copy();
        if(this._Team == ETeam.White) absDir.Y *= -1;

        var newPos = myPos.Add(absDir);
        var newCell = g_Globals.Game.Board.GetCellByPosition(newPos);
        if(!this.CheckForCollision(newCell))
            return this;

        this.TracedCells.Add(newCell);
        this.Cell = newCell;
        return this.Move(steps.Subtract(dir));
    }

    private CanTraceToCell(cell: Cell): boolean
    {
        // No cell exists.
        if(!cell)
            return false;

        // Collisions are disabled (knight)
        if(!this._UseCollisions)
            return true;

        // All cell movements after we traced an enemy are not permitted.
        if(this._TracedEnemy)
            return false;

        // Figure is already on this cell
        var figure = cell.Figure;
        if(figure)
        {
            if(figure.Team == this._Team)
                return false;

            if(!this._ContestEnemyCells)
                return false;

            this._TracedEnemy = true;
        }

        return true;
    }

    private CheckForCollision(cell: Cell)
    {
        if(!this.CanTraceToCell(cell))
        {
            this.HasCollided = true;
            return false;
        }

        return true;
    }

    public Reset(): Tracer
    {
        this.Cell = this._OriginalCell;
        this._TracedEnemy = false;
        this.HasCollided = false;
        return this;
    }

    public *YieldTracedCells()
    {
        for(var cell of this.TracedCells)
            yield cell;
    }
}