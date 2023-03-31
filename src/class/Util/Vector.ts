export class Vector2
{
    public X = 0;
    public Y = 0;

    public static get Zero()    { return new Vector2(0,  0) }
    public static get One()     { return new Vector2(1,  1) }
    public static get Left()    { return new Vector2(-1, 0) }
    public static get Right()   { return new Vector2(1,  0) }
    public static get Up()      { return new Vector2(0,  1) }
    public static get Down()    { return new Vector2(0, -1) }

    public static Random() : Vector2
    {
        return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }

    public static FromArray(array: number[])
    {
        return new Vector2(array[0] || 0, array[1] || 0);
    }

    constructor(x = 0, y = 0)
    {
        this.X = x;
        this.Y = y;
    }

    WithX(x: number) {
        return new Vector2(x, this.Y);
    }

    WithY(y: number) {
        return new Vector2(this.X, y);
    }

    DistanceTo(point : Vector2, squared = false) : number {
        var x = this.X - point.X;
        var y = this.Y - point.Y;

        if (squared)
            return x * x + y * y;

        return Math.sqrt(x * x + y * y);
    }

    get Length() {
        return Math.sqrt(this.X * this.X + this.Y * this.Y);
    }

    Normalize() {
        var length = this.Length;

        if (length == 0)
            return new Vector2();

        return new Vector2(this.X / length, this.Y / length);
    }

    WithLength(length : number) {
        var normalized = this.Normalize();
        return normalized.Scale(length);
    }

    ProjectOn(vector : Vector2) {
        var dot = this.Dot(vector);
        var length = vector.Length;
        return dot / length;
    }

    Dot(vector : Vector2) {
        return this.X * vector.X + this.Y * vector.Y;
    }

    /**
     * Adds another vector to us and returns the result
     */
    Add(vector : Vector2) {
        return new Vector2(this.X + vector.X, this.Y + vector.Y);
    }

    Scale(scale: Vector2): Vector2;
    Scale(scale: number): Vector2;
    Scale(scale: any): Vector2
    {
        if(scale instanceof Vector2)
            return new Vector2(this.X * scale.X, this.Y * scale.Y);

        return new Vector2(this.X * scale, this.Y * scale);
    }


    Divide(scale: Vector2): Vector2;
    Divide(scale: number): Vector2;
    Divide(scale: any) {
        if(scale instanceof Vector2)
            return new Vector2(this.X / scale.X, this.Y / scale.Y);

        return new Vector2(this.X / scale, this.Y / scale);
    }

    /**
     * Subtracts another vector from us and returns the result
     */
    Subtract(vector: Vector2) {
        return new Vector2(this.X - vector.X, this.Y - vector.Y);
    }

    toString() {
        return `Vector2[${Math.round(this.X * 100) / 100}, ${Math.round(this.Y * 100) / 100}]`;
        // return `Vector2[${this.X}, ${this.Y}]`;
    }

    IsEqual(vector) {
        return this.X == vector.X && this.Y == vector.Y;
    }

    IsNearlyEqual(vector: Vector2, delta: number = 0.001) {
        return Math.abs(this.X - vector.X) < delta && Math.abs(this.Y - vector.Y) < delta;
    }

    Min(vector : Vector2) {
        return new Vector2(Math.min(this.X, vector.X), Math.min(this.Y, vector.Y));
    }

    Max(vector : Vector2) {
        return new Vector2(Math.max(this.X, vector.X), Math.max(this.Y, vector.Y));
    }

    Lerp(vector: Vector2, t: number)
    {
        return new Vector2(this.X + (vector.X - this.X) * t, this.Y + (vector.Y - this.Y) * t);
    }

    Abs()
    {
        return new Vector2(Math.abs(this.X), Math.abs(this.Y));
    }

    AngleDifference(vector: Vector2)
    {
        return vector.Angle() - this.Angle();
    }

    Angle() {
        return Math.atan2(this.Y, this.X);
    }

    Copy() : Vector2
    {
        return new Vector2(this.X, this.Y);
    }
}