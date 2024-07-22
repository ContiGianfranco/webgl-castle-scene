import {Object3D} from "../object3D/Object3D.js";
import {gl} from "../main.js";

function distance(a, b){
    return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)+Math.pow(a.z-b.z,2));
}

function getPercent(positions) {
    let result = [];
    let length = 0;

    result.push(0);

    for (let i=1;i<positions.length;i++){
        length += distance(positions[i], positions[i-1]);
        result.push(length);
    }

    for (let i=0;i<result.length;i++){
        result[i] = result[i]/length;
    }

    return result;
}

class RevolutionCurve extends Object3D {

    constructor(path, material) {
        let pos = [];
        let normal=[];
        let uv = [];

        let positions = path.getPathPosition();
        let normals = path.getPathNormals();
        let percent = getPercent(positions);

        let rows = positions.length;
        let cols = 10;

        for (let i=0;i<rows;i++){
            for (let j=0;j<cols;j++){
                let p = positions[i];
                let u=j/(cols-1);
                let theta = 2*Math.PI*u;

                let mat = glMatrix.mat4.create();
                glMatrix.mat4.rotate(mat, mat, theta, [0,1,0]);
                glMatrix.mat4.translate(mat, mat, [p.x, p.y, p.z]);

                let position = glMatrix.vec3.create();
                glMatrix.mat4.getTranslation(position, mat);

                pos.push(position[0]);
                pos.push(position[1]);
                pos.push(position[2]);

                let n = normals[i];

                mat = glMatrix.mat4.create();
                glMatrix.mat4.rotate(mat, mat, theta, [0,1,0]);
                glMatrix.mat4.translate(mat, mat, [n[0], n[1], n[2]]);

                let norm = glMatrix.vec3.create();
                glMatrix.mat4.getTranslation(norm, mat);
                glMatrix.vec3.normalize(norm, norm);

                normal.push(norm[0]);
                normal.push(norm[1]);
                normal.push(norm[2]);

                uv.push(u);
                uv.push(percent[i]);
            }
        }

        let trianglesVerticeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
        trianglesVerticeBuffer.itemSize = 3;
        trianglesVerticeBuffer.numItems = pos.length / 3;


        let trianglesNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.STATIC_DRAW);
        trianglesNormalBuffer.itemSize = 3;
        trianglesNormalBuffer.numItems = normal.length / 3;

        let trianglesUvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglesUvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);

        let index=[];

        for (let i=0;i<rows-1;i++){
            index.push(i*cols);
            for (let j=0;j<cols-1;j++){
                index.push(i*cols+j);
                index.push((i+1)*cols+j);
                index.push(i*cols+j+1);
                index.push((i+1)*cols+j+1);
            }
            index.push((i+1)*cols+cols-1);
        }


        let trianglesIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trianglesIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
        trianglesIndexBuffer.number_vertex_point = index.length;
        trianglesIndexBuffer.itemSize = 1;
        trianglesIndexBuffer.numItems = index.length;

        super(trianglesVerticeBuffer,trianglesIndexBuffer,trianglesNormalBuffer,trianglesUvBuffer, material);
    }

}

export {RevolutionCurve}