import colors from "../constants/colors.js";
import {Cube} from "../object3D/Cube.js";
import {CatapultConterbalance} from "./CatapultConterbalance.js";
import {Object3D} from "../object3D/Object3D.js";
import {Material} from "../materials/Material.js";
import {Projectile} from "./Projectile.js";

class CatapultArm extends Object3D {

    constructor() {
        super(null,null,null);

        let sphere = new Projectile();
        sphere.trasladar([0,0.07,-0.6])
        this.addChild(sphere);

        let scale = 2;

        let materialT = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.05*scale, 0.665*scale);
        let materialF = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.05*scale, 0.04*scale);
        let materialS = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor_rotated.png", 0.665*scale, 0.04*scale);

        let materials = {
            'topT': materialT,
            'bottomT': materialT,
            'frontT': materialF,
            'backT': materialF,
            'leftT': materialS,
            'rightT': materialS
        }

        let cube = new Cube(0.05, 0.04, 0.665, colors.wood, materials);
        cube.trasladar([0,0,-0.1825])
        this.addChild(cube);

        materialT = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.15*scale, 0.17*scale);
        materialF = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.15*scale, 0.04*scale);
        materialS = new Material("./assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor_rotated.png", 0.17*scale, 0.04*scale);

        materials = {
            'topT': materialT,
            'bottomT': materialT,
            'frontT': materialF,
            'backT': materialF,
            'leftT': materialS,
            'rightT': materialS
        }

        cube = new Cube(0.15, 0.04, 0.17, colors.wood, materials);
        cube.trasladar([0,0,-0.6]);
        this.addChild(cube);


        let balance = new CatapultConterbalance();
        balance.trasladar([0,0,0.13]);
        this.addChild(balance)

        this.alfa = 0;
    }

    animate(delta) {
        this.childes[3].rotar(delta, [0,1,0])

        this.alfa += delta

        if (this.alfa === Math.PI/4 && delta !== 0){
            this.childes[0].trasladar([0,-5,0])
        } else if (this.alfa === 0){
            this.childes[0].trasladar([0,5,0])
        }
    }

    getProjectilePos(){
        return this.childes[0].getProjectilePos();
    }

}

export {CatapultArm}