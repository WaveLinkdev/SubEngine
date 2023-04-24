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

    setFocus(actor: Actor) {
        const transform = actor.GetComponent<Transform>(Transform);

        console.log(transform);


        if (transform) {
            this.Focus = actor;
            this.FocusTransform = transform;
        }
    }

    update(delta: number) {
        console.log(this.Focus, this.FocusTransform, this.FocusTransform?.position);


        if (this.Focus != null || undefined) {
            this.Position.x = -this.FocusTransform!.position.x + this.Engine.Renderer.app.renderer.width / 2;
            this.Position.y = -this.FocusTransform!.position.y  + this.Engine.Renderer.app.renderer.height / 2;;
            
        }
        console.log(this.Position);

        this.Engine.Renderer.stage.position = this.Position;

    }
}