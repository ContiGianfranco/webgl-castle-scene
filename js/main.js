import {Scene} from "./object3D/Scene.js";
import {Camara} from "./camara/Camara.js";

let mat4=glMatrix.mat4;

let gl = null,
    canvas = null;

export let viewMatrix = mat4.create();
export let projMatrix = mat4.create();
export let projectilePos = [0.0,0.0,0.0];

let escena = null;

let time = 0;
let isAnimated = false;

let app = {
    'castleSides': 5,
    'doorAngle': Math.PI/3,
    'wallHigth': 0.4,
    'width': 0.7,
    'length': 0.7,
    'floors': 3,
    'catapult': 3.9,
    'animate': function(){
        isAnimated=true;
    },
    'directionalColor': "#7a7563",
    'ambientColor': "#34271b",
    'punctualColor': "#724b12"
}

async function initWebGL() {

    canvas = document.getElementById("my-canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    try {
        gl = canvas.getContext("webgl");
    } catch (e) {
        alert("Error: Your browser does not appear to support WebGL.");
    }

    if (gl) {

        setupWebGL();
        GUI();
        await initShaders();
        tick();

    } else {
        alert("Error: Your browser does not appear to support WebGL.");
    }

}

function setupWebGL(){
    gl.enable(gl.DEPTH_TEST);
    //set the clear color
    gl.clearColor(0.1, 0.1, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.viewport(0, 0, canvas.width, canvas.height);

    // Matrix de Proyeccion Perspectiva
    mat4.perspective(projMatrix,45, canvas.width / canvas.height, 0.1, 100.0);

    window.camara = new Camara(canvas, viewMatrix);

    reloadScene();
}

function reloadScene(){
    escena = new Scene();
    escena.init();
    escena.rotar(-Math.PI/2,[0,1,0])
}

const compileShader = async (
    src, type
) => {
    const shaderSrc = await Promise.all([
        fetch(src)
            .then((value)=> {
                return value.text()
            })
    ]);

    //compile shaders
    return makeShader(shaderSrc, type);
}

async function initShaders() {
    let textureFragmentShader = await compileShader('./shaders/TextureFS.glsl', gl.FRAGMENT_SHADER)
    let vertexShader = await compileShader('./shaders/vertexShaders.glsl', gl.VERTEX_SHADER)
    let multiTextureFragmentShader = await  compileShader('./shaders/TexturasCompocitionFS.glsl', gl.FRAGMENT_SHADER)
    let lightColorFragmentShader = await  compileShader('./shaders/LightFS.glsl', gl.FRAGMENT_SHADER)

    window.glTextureProgram = gl.createProgram();

    gl.attachShader(glTextureProgram, vertexShader);
    gl.attachShader(glTextureProgram, textureFragmentShader);
    gl.linkProgram(glTextureProgram);

    window.glLightColorProgram = gl.createProgram();

    gl.attachShader(glLightColorProgram, vertexShader);
    gl.attachShader(glLightColorProgram, lightColorFragmentShader);
    gl.linkProgram(glLightColorProgram);

    if (!gl.getProgramParameter(glTextureProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the textures shader program.");
    }

    window.glMultiTextureProgram = gl.createProgram();

    gl.attachShader(glMultiTextureProgram, vertexShader);
    gl.attachShader(glMultiTextureProgram, multiTextureFragmentShader);
    gl.linkProgram(glMultiTextureProgram);

    if (!gl.getProgramParameter(glMultiTextureProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the textures shader program.");
    }
    glMultiTextureProgram.samplerUniform0 = gl.getUniformLocation(glMultiTextureProgram, "uSampler0");
    glMultiTextureProgram.samplerUniform1 = gl.getUniformLocation(glMultiTextureProgram, "uSampler1");
    glMultiTextureProgram.samplerUniform2 = gl.getUniformLocation(glMultiTextureProgram, "uSampler2");
}

function makeShader(src, type){
    //compile the vertex shader
    let shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("Error compiling shader: " + gl.getShaderInfoLog(shader));
    }
    return shader;
}

export function setupVertexShaderMatrix(program){
    let viewMatrixUniform  = gl.getUniformLocation(program, "viewMatrix");
    let projMatrixUniform  = gl.getUniformLocation(program, "projMatrix");
    let ViewerPositionUniform  = gl.getUniformLocation(program, "uViewerPosition");

    let tmp = glMatrix.mat4.create();
    glMatrix.mat4.invert(tmp, viewMatrix)
    let viewerPosition = tmp.slice(12, 15);

    gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
    gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
    gl.uniform3f(ViewerPositionUniform, viewerPosition[0], viewerPosition[1], viewerPosition[2]);
}

function drawScene(){

    let m1 = glMatrix.mat4.create();
    let m2 = glMatrix.mat4.create();

    escena.draw(m1, m2);
}

function updateCamara(){
    window.camara.setViewMatrix(viewMatrix);
}

function animate(){
    if (time>=10){
        time=0;
        isAnimated = false;
    } else {
        time+=0.15;
    }

    escena.animate(time)
}

function getProjectilePos(){
    projectilePos = escena.getProjectilePos()
}

function tick(){
    requestAnimationFrame(tick);
    getProjectilePos();
    drawScene();
    if (isAnimated){
        animate();
    }
    updateCamara();
}

function updateWall(){
    escena.updateWall();
}

function updateDoor(){
    escena.updateDoor();
}

function rotateCatapult(){
    escena.rotateCatapult();
}

function updateCastle(){
    escena.updateCastle();
}


function GUI (){

    let gui = new dat.GUI();

    // definimos una carpeta comandos en la variable f1
    let f1 = gui.addFolder('Castillo');

    f1.add(app, 'castleSides',4,8).name("Lados muralla").step(1).onChange(updateWall)
    f1.add(app, 'wallHigth',0.2,1.8).name("Altura muralla").step(0.1).onChange(updateWall)
    f1.add(app, 'doorAngle',0,Math.PI/2).name("Entrada").step(0.01).onChange(updateDoor)

    f1.add(app, 'floors',1,4).name("Numero de pisos").step(1).onChange(updateCastle)
    f1.add(app, 'width',0.2,1).name("Ancho").step(0.1).onChange(updateCastle)
    f1.add(app, 'length',0.2,1).name("Largo").step(0.1).onChange(updateCastle)

    let f2 = gui.addFolder('Catapulta');

    f2.add(app, 'catapult', 0,Math.PI*2).step(0.1).name("Direcion").onChange(rotateCatapult)
    f2.add(app, 'animate').name("Disparar");

    let f3 = gui.addFolder('Color');

    f3.addColor(app, 'ambientColor').name("Ambient")
    f3.addColor(app, 'directionalColor').name("Directional")
    f3.addColor(app, 'punctualColor').name("Directional")
}

window.onload= await initWebGL;

export {gl, app}