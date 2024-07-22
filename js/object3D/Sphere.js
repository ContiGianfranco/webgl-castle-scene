import {Object3D} from "./Object3D.js";
import {gl} from "../main.js";

function getPos(u,v,radio){

    const fi = u*Math.PI
    const thita = v*2*Math.PI

    const x = radio * Math.sin(fi) * Math.cos(thita);
    const y = radio * Math.cos(fi);
    const z = radio * Math.sin(fi) * Math.sin(thita);
    return [x,y,z];
}

class Sphere extends Object3D {

    constructor(rad, color, material) {
        let pos = [];
        let normal=[];
        let uv = [];

        let rows = 10;
        let cols = 10;

        for (let i=0;i<rows;i++){
            let u=i/(rows-1);
            for (let j=0;j<cols;j++){
                let v=j/(cols-1);

                let p = getPos(u,v,rad)

                pos.push(p[0]);
                pos.push(p[1]);
                pos.push(p[2]);

                let n = getPos(u,v,1);

                normal.push(n[0]);
                normal.push(n[1]);
                normal.push(n[2]);

                uv.push(u);
                uv.push(v);
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

        super(trianglesVerticeBuffer,trianglesIndexBuffer,trianglesNormalBuffer, trianglesUvBuffer,material);
        this.color = color;
    }

}

export {Sphere}