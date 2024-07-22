class Camara{

    constructor(canvas) {
        this.angleMultiplier = Math.PI/500;
        this.pressedKeys = new Set();
        this.mode = 'first_person';

        this.setDefaults();

        window.onkeydown = (event) => {
            this.pressedKeys.add(String.fromCharCode(event.keyCode));
        }
        window.onkeyup = (event) => {
            this.pressedKeys.delete(String.fromCharCode(event.keyCode));
        }
        window.onkeypress = (event) => {
            if (String.fromCharCode(event.keyCode) === '1') {
                this.mode = 'general';
                this.setDefaults();
            } else if (String.fromCharCode(event.keyCode) === '2') {
                this.mode = 'catapult'
                this.setDefaults();
            } else if (String.fromCharCode(event.keyCode) === '3') {
                this.mode = 'first_person'
                this.setDefaults();
            }
        }

        canvas.onmousedown = (event) => {
            if (event.which !== 1) return;
            this.listenToMouse = true;
            this.lastMouseX = event.x;
            this.lastMouseY = event.y;
        }
        canvas.onmouseup = () => {
            if (event.which !== 1) return;
            this.listenToMouse = false;
        }
        canvas.onmousemove = (event) => {
            if (!this.listenToMouse) return;

            this.updateAngle(event);

            this.lastMouseX = event.x;
            this.lastMouseY = event.y;
        }
    }

    setDefaults() {
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.xAngle = 0;
        this.yAngle = -0.35;
        this.step = 0.03;

        if (this.mode === 'first_person') {
            this.yAngleUpperLimit =  (3 / 8) * Math.PI;
            this.yAngleLowerLimit =  - (3 / 8) * Math.PI;
            this.offsetX = 0;
            this.offsetY = 1;
            this.offsetZ = 2;
        } else if (this.mode === 'general') {
            this.yAngleUpperLimit =  (1 / 64) * Math.PI;
            this.yAngleLowerLimit =  - (3 / 8) * Math.PI;
            this.orbitalRadius = 2;
            this.maxOrbitalRadius = 20;
            this.minOrbitalRadius = 0.5;
            this.offsetX = 0;
            this.offsetY = 0.25;
            this.offsetZ = 0;
        } else if (this.mode === 'catapult') {
            this.yAngleUpperLimit =  (1 / 64) * Math.PI;
            this.yAngleLowerLimit =  - (3 / 8) * Math.PI;
            this.orbitalRadius = 1;
            this.maxOrbitalRadius = 10;
            this.minOrbitalRadius = 0.25;
            this.offsetX = -2;
            this.offsetY = 0.05;
            this.offsetZ = 2;
        }
    }

    offset(backwardKey, forwardKey) {
        let backward = this.pressedKeys.has(backwardKey);
        let forward = this.pressedKeys.has(forwardKey);

        if (backward && !forward) {
            return -1;
        } else if (forward && !backward) {
            return 1;
        }

        return 0;
    }

    updateAngle(event) {
        let difference = (this.lastMouseX - event.x) * this.angleMultiplier;
        this.xAngle = (this.xAngle + difference);

        difference = (this.lastMouseY - event.y) * this.angleMultiplier;
        this.yAngle = (this.yAngle + difference);

        if (this.yAngle > this.yAngleUpperLimit) {
            this.yAngle = this.yAngleUpperLimit;
        } else if (this.yAngle < this.yAngleLowerLimit) {
            this.yAngle = this.yAngleLowerLimit;
        }
    }

    updateOrbital() {
        this.orbitalRadius += this.offset('W', 'S') * this.step;

        if (this.orbitalRadius < this.minOrbitalRadius) {
            this.orbitalRadius = this.minOrbitalRadius;
        } else if (this.orbitalRadius > this.maxOrbitalRadius) {
            this.orbitalRadius = this.maxOrbitalRadius;
        }
    }

    updateOffsets() {
        let offset = glMatrix.vec4.fromValues(
            this.offset('A', 'D'),
            0,
            this.offset('W', 'S'),
            1
        );
        let transformationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.rotateY(transformationMatrix, transformationMatrix, this.xAngle);
        glMatrix.mat4.rotateX(transformationMatrix, transformationMatrix, this.yAngle);
        glMatrix.vec4.transformMat4(offset, offset, transformationMatrix);

        let x = offset[0];
        let z = offset[2];
        let sum = Math.abs(x) + Math.abs(z);

        if (sum > 0.001) {
            x = x / sum;
            z = z / sum;
        } else {
            x = z = 0;
        }

        this.offsetX += x * this.step;
        this.offsetY = Math.max(this.offsetY + this.offset('E', 'Q') * this.step, 0.2);
        this.offsetZ += z * this.step;
    }

    updateEye() {
        this.eye = glMatrix.mat4.create();

        if (this.mode === 'first_person') {
            this.updateOffsets();
        } else {
            this.updateOrbital();
        }

        glMatrix.mat4.translate(this.eye, this.eye, [this.offsetX, this.offsetY, this.offsetZ])
        glMatrix.mat4.rotateY(this.eye, this.eye, this.xAngle);
        glMatrix.mat4.rotateX(this.eye, this.eye, this.yAngle);
    }

    setViewMatrix(viewMatrix) {
        this.updateEye();

        let eyePosition = this.eye.slice(12, 15);
        let eyeTangent = this.eye.slice(8, 11);

        let center = [
            eyePosition[0] - eyeTangent[0],
            eyePosition[1] - eyeTangent[1],
            eyePosition[2] - eyeTangent[2],
        ]

        if (this.mode === 'first_person') {
            glMatrix.mat4.lookAt(
                viewMatrix,
                eyePosition,
                center,
                [0, 1, 0]
            )
        } else {
            let eye = glMatrix.mat4.create();

            glMatrix.mat4.translate(eye, eye, [this.offsetX, this.offsetY, this.offsetZ]);

            glMatrix.mat4.rotateY(eye, eye, this.xAngle);
            glMatrix.mat4.rotateX(eye, eye, this.yAngle);

            glMatrix.mat4.translate(eye, eye, [0, 0, this.orbitalRadius]);

            glMatrix.mat4.lookAt(
                viewMatrix,
                eye.slice(12, 15),
                [this.offsetX, this.offsetY, this.offsetZ],
                [0, 1, 0]
            )
        }
    }
}

export {Camara}
