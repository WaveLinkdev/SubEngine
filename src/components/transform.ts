import { DisplayObject, Point } from "pixi.js";
import { Actor } from "../actor.js";
import { Component, ComponentInterface, NetworkComponent, component } from "../component.js";

@component
export class Transform extends Component implements ComponentInterface {
    public position: Point;
    public rotation: number;
    public scale: Point;

    static ComponentId: string = "transform";
    static Singleton: boolean = true;

    targets: DisplayObject[] = [];

    constructor(actor: Actor, position?: Point, rotation?: number, scale?: Point) {
        super(actor);

        this.position = position || new Point(0, 0);
        this.rotation = rotation || 0;
        this.scale = scale || new Point(1, 1);
    }

    AddMovable(target: DisplayObject) {
        this.targets.push(target);   

        console.log(this.targets);
        
    }

    update(delta: number) {
        this.targets.forEach((target) => {
            
            target.position = this.position;
            target.rotation = this.rotation;
            target.scale = this.scale;
        });
    }

    Rotate(angle: number) {
        this.rotation += angle;
        this.rotation %= 360;
    }
}