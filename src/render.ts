import { Container, Application, IApplicationOptions, Sprite, } from 'pixi.js'

/**
 * Adapter for Pixi.js
 */
export class Renderer {
    static defaultSettings = {
        width: 800,
        height: 600,
        backgroundColor: 0x000000,
        antialias: true,
    }

    private _app: Application;
    private _stage: Container;

    Layers: Container[] = [
    ];

    constructor(appSettings: Partial<IApplicationOptions> | undefined) {
        this._app = new Application({ ...Renderer.defaultSettings, ...appSettings });
        this._stage = this._app.stage;

        let InitialLayer = new Container();
        InitialLayer.name = "InitialLayer";
        this._stage.addChild(InitialLayer);

        let UILayer = new Container();
        UILayer.name = "UILayer";
        this._stage.addChild(UILayer);
        this.Layers.push(UILayer);
    }

    public CreateLayer(name: string) {
        let Layer = new Container();
        Layer.name = name;
        this._stage.addChild(Layer);
        this.Layers.push(Layer);
    }

    get app(): Application {
        return this._app;
    }

    get stage(): Container {
        return this.Layers[0];
    }
}