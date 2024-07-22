import {Object3D} from "../object3D/Object3D.js";
import {CatapultFrame} from "./CatapultFrame.js";
import {CatapultBody} from "./CatapultBody.js";
import {Projectile} from "./Projectile.js";

class Catapult extends Object3D {

    constructor() {
        super(null, null, null, null, null);

        this.sphereIsFling = false;
        this.projectilePos = [1,0.5,0]

        let frame = new CatapultFrame();
        frame.trasladar([0,0.35,0.18])
        this.addChild(frame);

        let body = new CatapultBody();
        this.addChild(body);


        let sphere = new Projectile();
        sphere.trasladar([0,0.823,-0.195])
        sphere.trasladar([0,-5,0])
        this.addChild(sphere);
    }

    draw(matrix, normal) {
        super.draw(matrix, normal);
        this.projectilePos = this.childes[0].getProjectilePos()
    }

    animate(time){

        if (time === 0){
            this.childes[0].animate(time);

            let sphere = new Projectile();
            sphere.trasladar([0,0.823,-0.195])
            sphere.trasladar([0,-5,0])

            this.childes[2] = sphere;
            this.sphereIsFling = false

            this.projectilePos = this.childes[0].getProjectilePos()

        } else if (time < 1){
            this.childes[0].animate(time);
            this.projectilePos = this.childes[0].getProjectilePos()
        } else {
            this.childes[0].animate(1);

            if (!this.sphereIsFling){
                this.sphereIsFling = true
                this.childes[2].trasladar([0,5,0]);
            } else {
                time = time/8
                let v = 10/20
                let a = -9.8/10
                let x = time*v
                let y = time*time*a + v*time
                this.childes[2].trasladar([0,y,x]);
            }

            this.projectilePos = this.childes[2].getProjectilePos()
        }
    }

    getProjectilePos(){
        return this.projectilePos;
    }
}

export {Catapult}