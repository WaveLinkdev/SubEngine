import { Bodies, Body, Composite, Engine as MatterEngine, Render, World } from "matter-js";
import { Actor } from "../actor";
import { Component, ComponentInterface, component, requires } from "../component";
import { Transform } from "./transform";
import { Engine } from "../engine";

@component
@requires(Transform)
export class Rigidbody extends Component implements ComponentInterface {

    Matter: MatterEngine;
    Engine: Engine;

    Transform: Transform;

    Body: Body;

    constructor(actor: Actor, isStatic: boolean = false, w: number = 10, h: number = 10) {
        super(actor);

        if (!actor.isBound()) return;

        this.Engine = actor.Engine;
        this.Matter = actor.Engine.Physics.Matter;

        this.Transform = actor.GetComponent<Transform>(Transform);

        this.Body = Bodies.rectangle(this.Transform.Position.x, this.Transform.Position.y, h, w, {isStatic});

        Composite.add(this.Matter.world, this.Body);
    }

    update(delta: number): void {

        this.Transform.Position = this.Body.position;
    }
}