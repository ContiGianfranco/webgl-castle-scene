import {Object3D} from "../object3D/Object3D.js";
import {Floor} from "./Floor.js";
import {CastleTower} from "./CastleTower.js";
import {app} from "../main.js";

class Castle extends Object3D {

    constructor() {
        super(null,null,null);

        let w = app.width;
        let l = app.length;

        let n = app.floors;

        for (let i=0; i<n; i++){
            let floor = new Floor();
            floor.trasladar([0,i*0.2,0]);
            this.addChild(floor);
        }


        for (let i=0; i<2; i++){
            for (let j=0; j<2; j++){
                let tower = new CastleTower();
                tower.trasladar([-l/2+l*i, 0, -w/2+w*j]);
                this.addChild(tower);
            }
        }
    }

}

export {Castle}