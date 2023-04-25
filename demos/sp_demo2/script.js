import { Engine } from "../../out/engine.js";
import { Actor } from "../../out/actor.js";
import { Transform } from "../../out/components/transform.js";
import { Rigidbody } from "../../out/components/rigidbody.js";
import { Bodies, Body, Composite, Constraint, Mouse, MouseConstraint } from "matter-js";
const engine = new Engine("canvas");
const floor = new Actor();
floor.bind(engine);
const floorTransform = new Transform(floor);
floorTransform._position.y = 100;
floorTransform._position.x = 400;
const floorRigidbody = new Rigidbody(floor, true, 10, 800);
const wheel1 = Bodies.circle(500, 75, 20, { friction: 0.9 });
const wheel2 = Bodies.circle(300, 75, 20, { friction: 0.9 });
const cab = Bodies.rectangle(400, 200, 200, 100, { chamfer: { radius: 10 } });
const constraintOptions = {};
const constraintA = Constraint.create({ bodyA: wheel1, pointA: { x: 0, y: 0 }, bodyB: cab, pointB: { x: 100, y: 0 }, stiffness: 0.5 });
const constraintB = Constraint.create({ bodyA: wheel2, pointA: { x: 0, y: 0 }, bodyB: cab, pointB: { x: -100, y: 0 }, stiffness: 0.5 });
var mouse = Mouse.create(engine.Physics.Matter.render.canvas), mouseConstraint = MouseConstraint.create(engine.Physics.Matter, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
Composite.add(engine.Physics.Matter.world, mouseConstraint);
// keep the mouse in sync with rendering
engine.Physics.Matter.render.mouse = mouse;
Composite.add(engine.Physics.Matter.world, [wheel1, wheel2, cab, constraintA, constraintB]);
engine.start();
let f = 0;
engine.Ticker.add(() => {
    Body.applyForce(wheel1, { x: wheel1.position.x, y: wheel1.position.y - 20 }, { x: f / 1000, y: 0 });
    Body.applyForce(wheel2, { x: wheel2.position.x, y: wheel2.position.y - 20 }, { x: f / 1000, y: 0 });
});
onkeydown = (s) => {
    if (s.key == "d" && s.repeat == false) {
        f += 1;
    }
    if (s.key == "a" && s.repeat == false) {
        f += -1;
    }
    if (s.key == "w" && s.repeat == false) {
        f = 0;
    }
};
