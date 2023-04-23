import { Renderer } from "./render.js";
import { Actor } from "./actor.js";
import { Camera } from "./camera.js";
import { Ticker } from "pixi.js";

// Base export is Engine class
export class Engine {

    public Actors: Map<string, Actor> = new Map();
    public Ticker: Ticker;
    public Renderer: Renderer;
    public Camera: Camera;

    constructor(target: HTMLCanvasElement | string) {
        if (typeof target == "string")
            target = document.getElementById(target) as HTMLCanvasElement;

        this.Renderer = new Renderer({ view: target });
        this.Ticker = this.Renderer.app.ticker;
        this.Camera = new Camera(this);

        console.log(this.Ticker);
    }

    bindActor(actor: Actor) {
        this.Actors.set(actor.InstanceId, actor);
        console.log(this.Actors);
    }

    start() {
        this.Actors.forEach((actor) => {
            actor.start();
        });

        this.Ticker.add(this.update.bind(this));
    }

    update(delta: number) {
        this.Camera.update(delta);

        this.Actors.forEach((actor) => {
            actor.update(delta);
        });
    }
}