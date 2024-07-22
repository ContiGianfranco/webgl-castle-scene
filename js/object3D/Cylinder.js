import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.js";

class Cylinder extends RevolutionCurve {

    constructor(higth, rad, color, material) {

        let controlPoints = [
            [[0,higth/2,0],[rad*0.25,higth/2,0],[rad*0.5,higth/2,0],[rad,higth/2,0]],
            [[rad,higth/2,0],[rad,higth/4,0],[rad,-higth/4,0],[rad,-higth/2,0]],
            [[rad,-higth/2,0],[rad*0.75,-higth/2,0],[rad*0.25,-higth/2,0],[0,-higth/2,0]]
        ];
        let path = new Path(controlPoints, 1);

        super(path, material);

        this.color = color;
    }

}

export {Cylinder}