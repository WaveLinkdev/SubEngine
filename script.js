import { Engine } from "./out/engine.js"
import { Actor, NetworkActor } from "./out/actor.js"
import { Transform } from "./out/components/transform.js"
import { Sprite } from "./out/components/sprite.js"

let engine = new Engine("canvas");

let actor = new Actor();
actor.bind(engine)
let transform2 = new Transform(actor);
let sprite2 = new Sprite(actor);

let actor2 = new Actor();
actor2.bind(engine)
let transform = new Transform(actor2);
let sprite = new Sprite(actor2);

transform.position.x = 100;
transform.position.y = 100;


window.onkeydown = (event) => {
    console.log(actor2.Engine.Camera);
    console.log(transform);
    console.log(event);
    if (event.repeat) return

    if (event.key == "w") {
        actor2.GetComponent(Transform).position.y += 1;
    }

    if (event.key == "s") {
        actor2.GetComponent(Transform).position.y -= 1;
    }

    if (event.key == "f") {
        actor2.Engine?.Camera.setFocus(actor);

        console.log(actor2.Engine?.Camera);
    }
}

engine.Ticker.add(() => {
})

engine.start();