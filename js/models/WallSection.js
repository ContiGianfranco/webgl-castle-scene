import {Object3D} from "../object3D/Object3D.js";
import {Tower} from "./Tower.js";
import {Wall} from "./Wall.js";


class WallSection extends Object3D {

    constructor(scale) {
        super(null,null,null,null, null);

        let muralla = new Wall();
        muralla.rotar(Math.PI/2, [0,1,0]);
        muralla.escalar([scale, 1, 1])
        this.addChild(muralla);

        let torre = new Tower();
        torre.trasladar([0.0,0.0,scale/2]);
        this.addChild(torre);
    }

}

export {WallSection}