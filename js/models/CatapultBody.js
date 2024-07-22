import colors from "../constants/colors.js";
import {Cube} from "../object3D/Cube.js";
import {CatapultAxis} from "./CatapultAxis.js";
import {Material} from "../materials/Material.js";

class CatapultBody extends Cube {

    constructor() {
        let scale = 2;

        let materialT = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.35*scale, 0.75*scale);
        let materialF = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.35*scale, 0.04*scale);
        let materialS = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor_rotated.png", 0.75*scale, 0.04*scale);

        let materials = {
            'topT': materialT,
            'bottomT': materialT,
            'frontT': materialF,
            'backT': materialF,
            'leftT': materialS,
            'rightT': materialS
        }

        super(0.35, 0.04, 0.75, colors.wood, materials);

        let axis = new CatapultAxis();
        axis.trasladar([0, 0, 0.35]);
        this.addChild(axis);

        axis = new CatapultAxis();
        axis.trasladar([0, 0, -0.35]);
        this.addChild(axis);
    }

}

export {CatapultBody}