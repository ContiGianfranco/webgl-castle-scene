import {Object3D} from "../object3D/Object3D.js";
import {Sphere} from "../object3D/Sphere.js";
import colors from "../constants/colors.js";
import {Material} from "../materials/Material.js";
import {LightMaterial} from "../materials/LightMaterial.js";
import {Cylinder} from "../object3D/Cylinder.js";

class Torch extends Object3D {

    constructor() {
        super(null, null, null, null, null);

        let material = new LightMaterial();

        this.addChild(new Sphere(0.015,colors.stoneGrey, material));


        let materialT = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.055*6, 0.006*10);

        let cylinder = new Cylinder(0.055, 0.006, colors.wood, materialT);
        cylinder.trasladar([0,-0.04,0])
        this.addChild(cylinder)
    }

}

export {Torch}