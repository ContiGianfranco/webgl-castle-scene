import {Cube} from "../object3D/Cube.js";
import {Object3D} from "../object3D/Object3D.js";
import {Wall} from "./Wall.js";
import {Door} from "./WallDoor.js";
import {app} from "../main.js";
import colors from "../constants/colors.js";
import {Material} from "../materials/Material.js";

class WallEntrance extends Object3D {

    constructor() {
        super(null,null,null,null,null);

        let h = app.wallHigth*0.7;

        let materialT = new Material("./assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 0.11 * 20, 1/15 * 20);
        let materialF = new Material("./assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 1/15 * 20, h * 20);
        let materialS = new Material("./assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 0.11 * 20, h * 20);

        let materials = {
            'topT': materialT,
            'bottomT': materialT,
            'frontT': materialF,
            'backT': materialF,
            'leftT': materialS,
            'rightT': materialS
        }

        let side = new Cube(1/15,h,0.11, colors.stoneGrey, materials);
        side.trasladar([-2/15,h/2,0])
        this.addChild(side)

        side = new Cube(1/15,h,0.11, colors.stoneGrey, materials);
        side.trasladar([2/15,h/2,0])
        this.addChild(side)

        materialT = new Material("./assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 1/3 * 20, 0.11 * 20);
        materialF = new Material("./assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 1/3 * 20, 1/15 * 20 );
        materialS = new Material("./assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 0.11 * 20, 1/15 * 20 );

        materials = {
            'topT': materialT,
            'bottomT': materialT,
            'frontT': materialF,
            'backT': materialF,
            'leftT': materialS,
            'rightT': materialS
        }

        let top = new Cube(1/3,1/15,0.11, colors.stoneGrey, materials);
        top.trasladar([0,h+1/30,0])
        this.addChild(top)

        let material = new Material("./assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 8./3, 8.);

        let wall = new Wall(material);
        wall.escalar([1/3,1,1]);
        wall.trasladar([1,0,0]);
        this.addChild(wall);

        wall = new Wall(material);
        wall.escalar([1/3,1,1]);
        wall.trasladar([-1,0,0]);
        this.addChild(wall);


        let alfa = app.doorAngle;
        this.oldDoorAngle = alfa;
        let door = new Door();
        door.rotar(alfa, [1,0,0])
        this.addChild(door);
    }

    updateDoor(){
        let alfa = app.doorAngle - this.oldDoorAngle;
        this.childes[5].rotar(alfa, [1,0,0]);
        this.oldDoorAngle = app.doorAngle;
    }

}

export {WallEntrance}