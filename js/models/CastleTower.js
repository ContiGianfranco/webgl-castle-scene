import {Object3D} from "../object3D/Object3D.js";
import {CastleTowerMainBody} from "./CastleTowerMainBody.js";
import {CastleTowerRoof} from "./CastleTowerRoof.js";
import {app} from "../main.js";

class CastleTower extends Object3D {

    constructor() {
        super(null, null, null, null, null);

        let h = 0.2*app.floors+0.1;

        this.addChild(new CastleTowerMainBody());

        let roof = new CastleTowerRoof();
        roof.trasladar([0,h,0])
        this.addChild(roof)
    }

}

export {CastleTower}