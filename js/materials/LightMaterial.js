import {app, gl} from "../main.js";

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16)/255,
        g: parseInt(result[2], 16)/255,
        b: parseInt(result[3], 16)/255
    } : null;
}

class LightMaterial {
    constructor() {}

    apply(){
        let program = this.program();

        let rgb = hexToRgb(app.punctualColor);
        gl.uniform3f(gl.getUniformLocation(program, 'punctualColor'), rgb.r, rgb.g, rgb.b);
    }

    program(){
        return glLightColorProgram;
    }
}

export {LightMaterial}