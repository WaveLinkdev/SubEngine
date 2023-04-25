import { Actor } from "../actor.js";
import { Component, ComponentInterface, component, requires } from "../component.js";
import { Container, Sprite as PixiSprite, Graphics } from "pixi.js"
import { Transform } from "./transform.js";

@component
@requires(Transform)
export class Sprite extends Component implements ComponentInterface {
    static ComponentId = "sprite";
    static Singleton = false;

    public Container: Container;
    public Sprite: PixiSprite;
    public Transform: Transform;

    constructor(actor: Actor) {
        super(actor);

        this.Container = new Container();
        this.Sprite = PixiSprite.from('/static/untitled.png');

        let transform = actor.GetComponent<Transform>(Transform);
        if (transform) this.Transform = transform;

        this.Transform.AddMovable(this.Container);

        this.Sprite.anchor.set(0.5, 0.5);

        this.Container.addChild(this.Sprite);



        if (actor.isBound()) {
            actor.Engine.Renderer.stage.addChild(this.Container);
        }
    }
}