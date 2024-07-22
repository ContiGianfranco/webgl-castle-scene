import {Object3D} from "../object3D/Object3D.js";
import {app} from "../main.js";
import {Catapult} from "./Catapult.js";

class CatapultSystem extends Object3D {

    constructor() {
        super(null, null, null, null, null);

        let catapult = new Catapult();

        this.lastAngle = app.catapult;
        catapult.rotar(app.catapult,[0,1,0])
        this.addChild(catapult);
    }

    animate(time){
        this.childes[0].animate(time)
    }

    getProjectilePos(){
        return this.childes[0].getProjectilePos();
    }

    updateAngle(){
        let alfa = app.catapult-this.lastAngle;
        this.lastAngle = app.catapult;

        this.childes[0].rotar(alfa,[0,1,0])
    }
}

export {CatapultSystem}