import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.js";
import colors from "../constants/colors.js";
import {app} from "../main.js";
import {Material} from "../materials/Material.js";

class Tower extends RevolutionCurve {

    constructor() {

        let h = app.wallHigth - 0.05;

        let controlPoints = [
            [[0,h+0.025,0],[0.01,h+0.025,0],[0.07,h+0.025,0],[0.08,h+0.025,0]],
            [[0.08,h+0.025,0],[0.08,h+0.03,0],[0.08,h+0.04,0],[0.08,h+0.05,0]],
            [[0.08,h+0.05,0],[0.085,h+0.05,0],[0.095,h+0.05,0],[0.1,h+0.05,0]],
            [[0.1,h+0.05,0],[0.1,h+0.04,0],[0.1,h+0.01,0],[0.1,h,0]],
            [[0.1,h,0],[0.05,h*0.75,0],[0.11,h*(2/7),0],[0.1,0,0]]
        ];
        let path = new Path(controlPoints, 0.1);

        let material = new Material("./assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);

        super(path, material);

        this.color = colors.stoneGrey;
    }

}

export {Tower}