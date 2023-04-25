import Matter, { Bodies, Body, Composite, Engine, Runner, Vector } from "matter-js";
import { DisplayObject, Point } from "pixi.js";
import { Actor } from "../actor.js";
import { Component, ComponentInterface, NetworkComponent, component } from "../component.js";

@component
export class Transform extends Component implements ComponentInterface {
    private _position = {
        x: 0,
        y: 0
    };

    set Position(position: Point | Vector) {
        this.SetPosition(position);
    }

    get Position(): Point {
        return new Point(this._position.x, this._position.y);
    }


    SetPosition(position: Point | Vector): void {
        this._position.x = position.x;
        this._position.y = position.y;
    }

    public rotation: number;
    public scale: Point;

    static ComponentId: string = "transform";
    static Singleton: boolean = true;

    targets: DisplayObject[] = [];

    constructor(actor: Actor, position?: Point, rotation?: number, scale?: Point) {
        super(actor);



        this.Position = position || new Point(0, 0);
        this.rotation = rotation || 0;
        this.scale = scale || new Point(1, 1);
    }

    AddMovable(target: DisplayObject) {
        this.targets.push(target);

        console.log(this.targets);

    }

    update(delta: number) {
        this.targets.forEach((target) => {
            target.position = this.Position;
            target.rotation = this.rotation;
            target.scale = this.scale;
        });
    }

    Rotate(angle: number) {
        this.rotation += angle;
        this.rotation %= 360;
    }


}