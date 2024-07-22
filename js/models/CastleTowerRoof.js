import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.js";
import colors from "../constants/colors.js";
import {Material} from "../materials/Material.js";

class CastleTowerRoof extends RevolutionCurve {

    constructor() {

        let controlPoints = [
            [[0,0.20,0],[0.025,0.1,0],[0.05,0.025,0],[0.1,0,0]],
            [[0.1,0,0],[0.075,0,0],[0.025,0,0],[0,0,0]]
        ];
        let path = new Path(controlPoints, 0.1);

        let material = new Material("./assets/textures/factory_wall_1k.blend/textures/factory_wall_diff_1k.jpg", 7., 7., 20, 0.45);

        super(path, material);

        this.color = colors.brightBlue;
    }

}

export {CastleTowerRoof}