import { Board } from "./Board";
import { ETeam } from "./Constants";
import { DOMEntity } from "./DOMEntity";
import { Figure } from "./Figures/Figure";
import { SelectionBox } from "./SelectionBox";
import { List } from "./Util/List";

export const g_Globals: {
    Time?: number;
    Game?: Chess;
} = {};

export class Chess
{
    Container: HTMLElement;
    Instance: Chess
    Entities = new List<DOMEntity>();
    Board: Board;

    constructor()
    {
        g_Globals.Game = this;
        setAnimationFrameInterval(this.OnAnimationFrame.bind(this));

        this.Container = document.querySelector("#game_container");
        this.Board = new Board();
        this.Container.appendChild(this.Board.DOMElement);

        requestAnimationFrame(this.StartGame.bind(this));
    }

    StartGame()
    {
        this.Board.ResetBoard();
    }

    OnAnimationFrame(curTime: DOMHighResTimeStamp)
    {
        g_Globals.Time = curTime / 1000;

        for(var ent of this.Entities)
            ent.InvokeFrame();
    }

    public InvokeMethodOnEntitiesOfType<T>(type: new() => T, cb: (e: T) => ((...args: any) => void), ...args: any)
    {
        for(var ent of this.Entities)
        {
            if(!(ent instanceof type))
                continue;

            var fn = cb(ent);
            fn.call(ent, ...args);
        }
    }
}

/** Helper function that runs a callback in requestAnimationFrame in a loop. */
function setAnimationFrameInterval(cb: FrameRequestCallback)
{
    requestAnimationFrame((currentTime: number) => {
        setAnimationFrameInterval(cb.bind(this));
        cb.call(this, currentTime);
    });
}