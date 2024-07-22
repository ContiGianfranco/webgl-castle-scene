import {Sphere} from "../object3D/Sphere.js";
import {LightMaterial} from "../materials/LightMaterial.js";

class Projectile extends Sphere {

    constructor() {
        let material = new LightMaterial();
        super(0.05, null, material);
        this.positon = [0,0,0]
    }

    draw(matrix, normal) {
        super.draw(matrix, normal);

        let modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.multiply(modelMatrix,matrix,this.modelMatrix);

        this.positon = modelMatrix.slice(12, 15);

    }

    getProjectilePos(){
        return this.positon;
    }
}

export {Projectile}