import {Object3D} from "./Object3D.js";
import {Plane} from "./Plane.js";

class Cube extends Object3D {

    constructor(length, high, width, color, materials) {


        super(null,null,null, null, null);


        let plane = new Plane(length, width, color, materials.topT);
        plane.trasladar([0,high/2,0])
        this.addChild(plane);

        plane = new Plane(length, width, color, materials.bottomT);
        plane.rotar(Math.PI, [1,0,0]);
        plane.trasladar([0,high/2,0])
        this.addChild(plane);

        plane = new Plane(length, high, color, materials.frontT);
        plane.rotar(Math.PI/2, [1,0,0]);
        plane.trasladar([0,width/2,0]);
        this.addChild(plane);

        plane = new Plane(length, high, color, materials.backT);
        plane.rotar(-Math.PI/2, [1,0,0]);
        plane.trasladar([0,width/2,0])
        this.addChild(plane);


        plane = new Plane(width, high, color, materials.leftT);
        plane.rotar(-Math.PI/2, [0,1,0]);
        plane.rotar(Math.PI/2, [1,0,0]);
        plane.trasladar([0,length/2,0])
        this.addChild(plane);

        plane = new Plane(width, high, color, materials.rightT);
        plane.rotar(-Math.PI/2, [0,1,0]);
        plane.rotar(-Math.PI/2, [1,0,0]);
        plane.trasladar([0,length/2,0])
        this.addChild(plane);
    }

}

export {Cube}