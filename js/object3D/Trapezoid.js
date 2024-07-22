import {Object3D} from "./Object3D.js";
import {Plane} from "./Plane.js";
import {Trapezoid2D} from "./Trapezoid2D.js";

class Trapezoid extends Object3D {

    constructor(baseLength, topLength, high, width, color, materials) {
        super(null,null,null,null, null);


        let plane = new Trapezoid2D(baseLength, topLength, high, color, materials.frontT);
        plane.rotar(Math.PI/2,[1,0,0]);
        plane.trasladar([0, width/2, 0]);
        this.addChild(plane);

        plane = new Trapezoid2D(baseLength, topLength, high, color, materials.backT);
        plane.rotar(Math.PI,[0,1,0]);
        plane.rotar(Math.PI/2,[1,0,0]);
        plane.trasladar([0, width/2, 0]);
        this.addChild(plane);

        plane = new Plane(baseLength, width, color, materials.bottomT);
        plane.rotar(Math.PI, [1,0,0]);
        plane.trasladar([0,high/2,0]);
        this.addChild(plane);

        plane = new Plane(topLength, width, color, materials.topT);
        plane.trasladar([0,high/2,0]);
        this.addChild(plane);


        let adja = high;
        let oppo = (baseLength-topLength)/2;
        let hypo = Math.sqrt((adja**2)+(oppo**2))
        let alfa = Math.asin(adja/hypo);
        let theta = Math.PI/2-alfa;
        let d = topLength/2+oppo/2;

        plane = new Plane(hypo, width, color, materials.leftT);
        plane.rotar(alfa, [0,0,1])
        plane.trasladar([d*Math.sin(-theta), d*Math.cos(-theta),0])
        this.addChild(plane);

        plane = new Plane(hypo, width, color, materials.rightT);
        plane.rotar(-alfa, [0,0,1])
        plane.trasladar([d*Math.sin(theta), d*Math.cos(theta),0])
        this.addChild(plane);
    }

}

export {Trapezoid}