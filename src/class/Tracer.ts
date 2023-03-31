import { Cell } from "./Cell";
import { g_Globals } from "./Chess";
import { ETeam } from "./Constants";
import { List } from "./Util/List";
import { Vector2 } from "./Util/Vector";

export const MAX_CELLS = 8;

export enum ETraceError
{
    None,
    OutOfBounds,
    Blocked
}

export class Tracer
{
    public Cell: Cell;
    public Error = ETraceError.None;
    public TracedCells = new List<Cell>()
    private _OriginalCell: Cell;
    private _UseCollisions = true;
    private _ContestEnemyCells = true;
    private _Team = ETeam.White;
    private _IsContestingEnemyCell = false;

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
        if(this.Error)
            return this;

        // Steps is zero, we are done.
        if(steps.Length == 0) 
            return this;

        // Get our current position.
        var myPos = this.Cell.Position;
        // Calculate absolute direction we need to move.
        var dir = Vector2.Zero;
        // Normalize each axis value so we get either -1 or 1.
        if(steps.X != 0) dir.X = steps.X / Math.abs(steps.X);
        if(steps.Y != 0) dir.Y = steps.Y / Math.abs(steps.Y);

        // Absolute direction is the direction we're 
        // actually going to be tracing.
        var absDir = dir.Copy();
        // White figures move the opposite direction from the 
        // coordinate space.
        if(this._Team == ETeam.White) 
            absDir.Y *= -1;

        // Calculate new position and finding cell on that position.
        var newPos = myPos.Add(absDir);
        var newCell = g_Globals.Game.Board.GetCellByPosition(newPos);

        // See if we can trace to that cell.
        this.Error = this.CanTraceToCell(newCell);
        if(this.Error != ETraceError.None)
            return this;

        // We can trace to that cell, add it to the trace list.
        this.TracedCells.Add(newCell);
        // This is our current cell.
        this.Cell = newCell;
        // Move further.
        return this.Move(steps.Subtract(dir));
    }

    private CanTraceToCell(cell: Cell): ETraceError
    {
        // No cell exists.
        if(!cell)
            return ETraceError.OutOfBounds;

        // Collisions are disabled (knight)
        if(!this._UseCollisions)
            return ETraceError.None;

        // All cell movements after we traced an enemy are not permitted.
        if(this._IsContestingEnemyCell)
            return ETraceError.Blocked;

        // There is a figure on this cell.
        var figure = cell.Figure;
        if(figure)
        {
            // If there is our teamate on this cell, we can't 
            // go here under any circumstances.
            if(figure.Team == this._Team)
            {
                return ETraceError.Blocked;
            }

            // If this trace can contest enemy cells
            if(this._ContestEnemyCells)
            {
                // Mark that we are currently contesting an enemy cell
                // We can't move after that.
                this._IsContestingEnemyCell = true;
            }
            else
            {
                // We can't contest enemy cells, we are blocked by an enemy.
                return ETraceError.Blocked;
            }
        }

        return ETraceError.None;
    }

    private CheckForCollision(cell: Cell)
    {
    }

    public Reset(): Tracer
    {
        this.Cell = this._OriginalCell;
        this.Error = ETraceError.None;
        this._IsContestingEnemyCell = false;
        return this;
    }

    public *YieldTracedCells()
    {
        for(var cell of this.TracedCells)
            yield cell;
    }
}