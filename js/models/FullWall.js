import {Object3D} from "../object3D/Object3D.js";
import {WallSection} from "./WallSection.js";
import {WallEntranceSection} from "./WallEntranceSection.js";
import {app} from "../main.js";


class FullWall extends Object3D {

    constructor() {

        super(null,null,null,null, null);
    }

    init(){
        let n = app.castleSides;
        let alfa = 0;

        let scale = Math.sin(Math.PI/n)*2
        let r = Math.cos(Math.PI/n)
        let section = new WallEntranceSection(scale);
        section.rotar(alfa, [0.0,1.0,0.0])
        section.trasladar([r,0.0,0.0]);
        this.addChild(section);
        alfa += 2*Math.PI/n;

        for (let i=0;i<n-1;i++){
            section = new WallSection(scale);
            section.rotar(alfa, [0.0,1.0,0.0])
            section.trasladar([r,0.0,0.0]);
            this.addChild(section);
            alfa += 2*Math.PI/n;
        }
    }

    updateDoor(){
        this.childes[0].updateDoor();
    }

}

export {FullWall}