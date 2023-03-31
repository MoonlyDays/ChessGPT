export interface IReadOnlyList<T>
{
    get Length();

    Contains(el: T): boolean;
    IndexOf(el: T): number;
    At(idx: number): T;
    Copy(): List<T>;

    Filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    Filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
    [Symbol.iterator]();
}

export interface IList<T> extends IReadOnlyList<T>
{
    Add(el: T);
    Remove(el: T);
    Clear(el: T);
}

export class List<T> implements IList<T>
{
    private _elements: T[] = [];

    Add(el: T)
    {
        if(this.Contains(el))
            return;

        this._elements.push(el);
    }

    Remove(el: T)
    {
        if(!this.Contains(el))
            return;

        this.RemoveAt(this.IndexOf(el));
    }

    RemoveAt(idx: number)
    {
        this._elements.splice(idx, 1);
    }

    Clear()
    {
        this._elements = [];
    }

    Contains(el: T): boolean 
    {
        return this._elements.includes(el);
    }

    IndexOf(el: T)
    {
        return this._elements.indexOf(el);
    }

    At(idx: number)
    {
        return this._elements[idx];
    }

    *[Symbol.iterator]()
    {
        for(var el of this._elements)
            yield el;
    }

    Filter(predicate: any, thisArg?: any)
    {
        return this._elements.filter(predicate, thisArg);
    }

    Copy(): List<T>
    {
        var copy = new List<T>();
        Object.assign(copy._elements, this._elements);
        return copy;
    }

    get Length() { return this._elements.length; }
}