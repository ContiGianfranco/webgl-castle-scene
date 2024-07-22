import {Object3D} from "./Object3D.js";
import {Terrain} from "../models/Terrain.js";
import {FullWall} from "../models/FullWall.js";
import {Castle} from "../models/Castle.js";
import {CatapultSystem} from "../models/CatapultSystem.js";
import {Torch} from "../models/Torch.js";

class Scene extends Object3D {

    constructor() {
        super(null,null,null,null, null);
    }

    init(){
        let catapult = new CatapultSystem();
        catapult.escalar([0.3,0.3,0.3])
        catapult.trasladar([2/0.3,0.085,2/0.3])
        this.addChild(catapult);

        let terreno = new Terrain();
        this.addChild(terreno);

        let muralla = new FullWall();
        muralla.init();
        this.addChild(muralla);

        this.addChild(new Castle());

        let torch = new Torch();
        torch.trasladar([0.6,0.0675,-0.4])
        this.addChild(torch);

        torch = new Torch();
        torch.trasladar([0.6,0.0675,0.4])
        this.addChild(torch);
    }

    updateWall(){
        let wall = new FullWall();
        wall.init();
        this.childes[2] = wall;
    }

    rotateCatapult(){
        this.childes[0].updateAngle();
    }

    updateDoor(){
        this.childes[2].updateDoor();
    }

    updateCastle(){
        this.childes[3] = new Castle();
    }

    animate(time){
        this.childes[0].animate(time);
    }

    getProjectilePos(){
        return this.childes[0].getProjectilePos();
    }
}

export {Scene}