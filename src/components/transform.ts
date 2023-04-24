import Matter, { Bodies, Body, Composite, Engine, Runner } from "matter-js";
import { DisplayObject, Point } from "pixi.js";
import { Actor } from "../actor.js";
import { Component, ComponentInterface, NetworkComponent, component } from "../component.js";

@component
export class Transform extends Component implements ComponentInterface {
    public position: Point;
    public rotation: number;
    public scale: Point;

    public Matter: Engine;

    static ComponentId: string = "transform";
    static Singleton: boolean = true;

    targets: DisplayObject[] = [];

    constructor(actor: Actor, position?: Point, rotation?: number, scale?: Point) {
        super(actor);

    

        this.Matter = Engine.create();
        let thisBody = Bodies.rectangle(0, 0, 100, 100);
        let ground = Bodies.rectangle(0, -1000, 1000, 1, {isStatic: true});
        Composite.add(this.Matter.world, [thisBody, ground])

        let runner = Runner.create();
        Runner.run(runner, this.Matter)

        

        this.position = position || new Point(0, 0);
        this.rotation = rotation || 0;
        this.scale = scale || new Point(1, 1);
    }

    AddMovable(target: DisplayObject) {
        this.targets.push(target);   

        console.log(this.targets);
        
    }

    update(delta: number) {
        this.position.x = this.Matter.world.bodies[0].position.x
        this.position.y = this.Matter.world.bodies[0].position.y

        this.targets.forEach((target) => {
            console.log(this.Matter.world.bodies[0].velocity);
            
            target.position = this.Matter.world.bodies[0].position;
            target.rotation = this.rotation;
            target.scale = this.scale;
        });
    }

    Rotate(angle: number) {
        this.rotation += angle;
        this.rotation %= 360;
    }
}