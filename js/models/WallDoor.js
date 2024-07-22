import {Cube} from "../object3D/Cube.js";
import {Object3D} from "../object3D/Object3D.js";
import colors from "../constants/colors.js";
import {app} from "../main.js";
import {Material} from "../materials/Material.js";

class Door extends Object3D {

    constructor() {
        super(null, null, null, null);

        let h = app.wallHigth*0.7;

        let scale = 5;

        let materialT = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 1/5 * scale, 0.025 * scale);
        let materialS = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.025 * scale, 1/5 * scale);
        let materialF = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 1/5 * scale, h * scale);

        let materials = {
            'topT': materialT,
            'bottomT': materialT,
            'frontT': materialF,
            'backT': materialF,
            'leftT': materialS,
            'rightT': materialS
        }

        let door = new Cube(1/5,h,0.025, colors.wood, materials);
        door.trasladar([0,h/2,0]);
        this.addChild(door)
    }

}

export {Door}