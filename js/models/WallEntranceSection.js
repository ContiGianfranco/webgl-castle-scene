import {Tower} from "./Tower.js"
import {WallEntrance} from "./WallEntrance.js";
import {Object3D} from "../object3D/Object3D.js";


class WallEntranceSection extends Object3D {

    constructor(scale) {
        super(null,null,null,null, null);

        let entrance = new WallEntrance();
        entrance.rotar(Math.PI/2, [0,1,0]);
        entrance.escalar([scale,1,1])
        this.addChild(entrance);

        let torre = new Tower();
        torre.trasladar([0.0,0.0,scale/2]);
        this.addChild(torre);
    }

    updateDoor(){
        this.childes[0].updateDoor();
    }

}

export {WallEntranceSection}