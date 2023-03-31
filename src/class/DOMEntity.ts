import { g_Globals } from "./Chess";

export type ClassBindingFn = () => boolean;

export class DOMEntity
{
    DOMElement: HTMLElement;
    Bindings = new Map<string, ClassBindingFn>();

    constructor()
    {
        g_Globals.Game.Entities.Add(this);
        this.DOMElement = document.createElement("div");
        this.SetupDOMElement(this.DOMElement);
        this.SetupElementListeners(this.DOMElement);
    }

    private _NextClassBindingEvaluate = 0;
    private EvaluateClassBindings()
    {
        if(g_Globals.Time < this._NextClassBindingEvaluate)
            return;

        this._NextClassBindingEvaluate = g_Globals.Time + .1;

        for(var pair of this.Bindings)
        {
            var cn = pair[0];
            var cb = pair[1];

            if(cb.call(this))
                this.DOMElement.classList.add(cn);
            else
                this.DOMElement.classList.remove(cn);
        }
    }

    public InvokeFrame()
    {
        this.Frame();
        this.EvaluateClassBindings();
    }

    public Frame()
    {

    }

    SetupDOMElement(el: HTMLElement) {}

    BindClass(className, cb: ClassBindingFn)
    {
        this.Bindings.set(className, cb);
    }

    public Destroy()
    {
        this.DOMElement.remove();
        g_Globals.Game.Entities.Remove(this);
    }

    SetupElementListeners(o: HTMLElement)
    {
        o.addEventListener("click",         e => this.OnClick(e));
        o.addEventListener("dblclick",      e => this.OnDoubleClick(e));
        o.addEventListener("contextmenu",   e => this.OnContextMenu(e));

        o.addEventListener("mouseover",     e => this.OnMouseOver(e));
        o.addEventListener("mouseout",      e => this.OnMouseOut(e));
        o.addEventListener("mousedown",     e => this.OnMouseDown(e));
        o.addEventListener("mouseenter",    e => this.OnMouseEnter(e));
        o.addEventListener("mouseleave",    e => this.OnMouseLeave(e));
        o.addEventListener("mousemove",     e => this.OnMouseMove(e));
        o.addEventListener("mouseup",       e => this.OnMouseUp(e));

        o.addEventListener("touchstart",    e => this.OnTouchStart(e));
        o.addEventListener("touchmove",     e => this.OnTouchMove(e));
        o.addEventListener("touchend",      e => this.OnTouchEnd(e));
        o.addEventListener("touchcancel",   e => this.OnTouchCancel(e));
    }

    OnMouseDown(ev: MouseEvent) {}
    OnMouseUp(ev: MouseEvent) {}
    OnMouseOver(ev: MouseEvent) {}
    OnMouseOut(ev: MouseEvent) {}
    OnMouseEnter(ev: MouseEvent) {}
    OnMouseLeave(ev: MouseEvent) {}
    OnMouseMove(ev: MouseEvent) {}
    OnClick(ev: MouseEvent) {}
    OnDoubleClick(ev: MouseEvent) {}
    OnContextMenu(ev: MouseEvent) {}
    OnTouchStart(ev: TouchEvent) {}
    OnTouchMove(ev: TouchEvent) {}
    OnTouchEnd(ev: TouchEvent) {}
    OnTouchCancel(ev: TouchEvent) {}
}