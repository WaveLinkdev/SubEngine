import { Actor } from "./actor.js";
import { nanoid } from "nanoid"

export class Component {
    actor: Actor;
    static Singleton: boolean = true;
    static ComponentId: string;

    InstanceId: string = nanoid();
    constructor(actor: Actor) {
        this.actor = actor;
        this.bind(actor)
    }

    bind(actor: Actor) {
        actor.bindComponent(this)
    }

    update(delta: number) { };
    start() { };

    getComponentId() {
        return (this.constructor as typeof Component).ComponentId;
    }

    isSingle(): boolean {
        return (this.constructor as typeof Component).Singleton;
    }
}

export class NetworkComponent extends Component {
    constructor(actor: Actor) {
        super(actor);
        console.log("SENDING COMPONENT_SPAWN TO NETWORK")
    }
}

export interface ComponentInterface {
    update(delta: number): void;
    start(): void
}

export function component<T extends { new(...args: any[]): {} }>(constructor: T, _: any) {
    const ComponentClass = constructor as unknown as typeof Component;
    if (ComponentClass.ComponentId == undefined) ComponentClass.ComponentId = nanoid();
    if (ComponentClass.Singleton == undefined) ComponentClass.Singleton = false;


    return class extends constructor {
        getComponentId(): string {
            return (this.constructor as typeof Component).ComponentId;
        }

        isSingle(): boolean {
            return (this.constructor as typeof Component).Singleton;
        }
    }
}

export function requires(requiree: typeof Component) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T, _: any) {
        return class extends constructor {
            bind(actor: Actor) {
                console.log(requiree.ComponentId, actor.Components);
                
                if (!actor.Components.has(requiree.ComponentId)) {
                    let component = new requiree(actor);
                    component.bind(actor);
                }

                actor.bindComponent(this as unknown as Component)
            }
        }
    }
}