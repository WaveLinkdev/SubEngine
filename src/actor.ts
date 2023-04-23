import { nanoid } from "nanoid"
import { Engine } from "./engine.js";
import { Component } from "./component.js";
import { Transform } from "./components/transform.js";

export class Actor {

    static ActorId: string;
    InstanceId: string = nanoid();
    Components: Map<string, Component> = new Map();
    Engine: Engine | null = null;

    public isBound(): this is { Engine: Engine } {
        return this.Engine !== null;
    }

    public bind(engine: Engine) {
        engine.bindActor(this);
        this.Engine = engine;
    }

    public bindComponent(component: Component) {
        console.log(component);
        if (component.isSingle() && this.Components.has(component.getComponentId())) return;

        this.Components.set(component.getComponentId(), component);
        console.log('added');
    }

    public update(delta: number) {
        this.Components.forEach((component) => {
            component.update(delta);
        });
    }

    public start() {
        setTimeout(() => {
            this.Components.forEach((component) => {
                console.log(component.getComponentId());
            })
        }, 1000);
    }

    getActorId() {
        return (this.constructor as typeof Actor).ActorId;
    }

    GetComponent<T extends Component>(component: typeof T): T | null {
        return this.Components.get(component.ComponentId) as T || null;
    }
}

export class NetworkActor extends Actor {
    static ActorId: string = "network_actor";

    constructor() {
        super();

        console.log("SENDING SPAWN TO NETWORK")
    }
}



