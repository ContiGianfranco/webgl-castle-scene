import {app, gl} from "../main.js";

function setUniformFloat(key, value, program) {
    let tmp  = gl.getUniformLocation(program, key);
    gl.uniform1f(tmp, value);
}

function initTexture(file){

    let texture = gl.createTexture();
    texture.image = new Image();

    texture.image.onload = function () {

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 			// invierto el ejeY
        gl.bindTexture(gl.TEXTURE_2D, texture); 						// activo la textura

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);	// cargo el bitmap en la GPU

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);					// selecciono filtro de magnificacion
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);	// selecciono filtro de minificacion

        gl.generateMipmap(gl.TEXTURE_2D);		// genero los mipmaps
        gl.bindTexture(gl.TEXTURE_2D, null);

    }
    texture.image.src = file;

    return texture;
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16)/255,
        g: parseInt(result[2], 16)/255,
        b: parseInt(result[3], 16)/255
    } : null;
}

class BlendTextureMaterial {
    constructor(paths, uScale, vScale, glossiness = 1, ksFactor = 0.1) {
        this.textures = []
        for (let i=0; i < paths.length; i++) {
            this.textures.push(initTexture(paths[i]))
        }
        this.scale = {u: uScale, v: vScale}

        this.glossiness = glossiness;
        this.ksFactor = ksFactor;
    }

    apply(){
        let program = this.program();

        setUniformFloat("uScale", this.scale.u, program);
        setUniformFloat("vScale", this.scale.v, program);

        gl.uniform1f(gl.getUniformLocation(program, 'uGlossiness'), this.glossiness);
        gl.uniform1f(gl.getUniformLocation(program, 'uKsFactor'), this.ksFactor);

        let rgb = hexToRgb(app.directionalColor);
        gl.uniform3f(gl.getUniformLocation(program, 'directColor'), rgb.r, rgb.g, rgb.b);
        rgb = hexToRgb(app.ambientColor);
        gl.uniform3f(gl.getUniformLocation(program, 'ia'), rgb.r, rgb.g, rgb.b);
        rgb = hexToRgb(app.punctualColor);
        gl.uniform3f(gl.getUniformLocation(program, 'punctualColor'), rgb.r, rgb.g, rgb.b);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
        gl.uniform1i(program.samplerUniform0, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[1]);
        gl.uniform1i(program.samplerUniform1, 1);

        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[2]);
        gl.uniform1i(program.samplerUniform2, 2);
    }

    program(){
        return glMultiTextureProgram;
    }
}

export {BlendTextureMaterial}