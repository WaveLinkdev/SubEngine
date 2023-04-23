import { Point } from "pixi.js";
import { Transform } from "./components/transform.js";
import { Engine } from "./engine.js";
import { Actor } from "./actor.js";

export class Camera {
    
    Engine: Engine;
    Position: Point = new Point(0, 0);
    Focus: Actor | null = null;
    FocusTransform: Transform | null = null;

    constructor(engine: Engine) {
        this.Engine = engine;
    }

    setFocus (actor: Actor) {
        const transform = actor.GetComponent<Transform>(Transform);
        if(transform) {
            this.Focus = actor;
            this.FocusTransform = transform;
        }
    }

    update(delta: number) {
        if(this.Focus) {
            this.Position = this.FocusTransform!.position;
        }

        this.Engine.Renderer.stage.position = this.Position;
        
    }
}