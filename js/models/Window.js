import {Cube} from "../object3D/Cube.js";
import colors from "../constants/colors.js";
import {Material} from "../materials/Material.js";

class Window extends Cube {

    constructor() {

        let materialGlass = new Material("./assets/textures/glass/TexturesCom_HighRiseGlass0069_1_seamless_S.jpg", 0.25, 1., 15, 1);

        let material = new Material("./assets/textures/Bronze01_MR_1K/Bronze01_1K_BaseColor.png", 0.5, 1., 30, 0.2);

        let materials = {
            'topT': material,
            'bottomT': material,
            'frontT': materialGlass,
            'backT': materialGlass,
            'leftT': material,
            'rightT': material
        }

        super(0.05, 0.1, 0.025, colors.black, materials);
    }

}

export {Window}