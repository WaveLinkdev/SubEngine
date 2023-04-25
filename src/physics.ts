import Matter, { Engine as MatterEngine, Body as MatterBody, Runner, Render } from "matter-js";
import { Rigidbody } from "./components/rigidbody";
import { Renderer } from "./render";
import { Engine } from "./engine";

export class Physcis {
    public Matter: MatterEngine;
    public Bodies: Map<Rigidbody, MatterBody> = new Map<Rigidbody, MatterBody>();
    public Engine: Engine;

    constructor(engine: Engine) {
        this.Engine = engine;
        this.Matter = MatterEngine.create({
            timing: {
                timeScale: 10
            }
        });

        let render = Render.create({
            element: document.body,
            engine: this.Matter,
            options: {
                showAxes: true,
                showCollisions: true,
                showVelocity: true,
                showAngleIndicator: true,
                showInternalEdges: true,
                // showDebug: true,
                showIds: true,
                showBounds: true,
                showPositions: true,
                showSeparations: true,
            }
        })

        this.Matter.render = render;

        Render.run(render);

        this.Engine.Ticker.add((delta) => {
            MatterEngine.update(this.Matter, delta);
        })
    }
}