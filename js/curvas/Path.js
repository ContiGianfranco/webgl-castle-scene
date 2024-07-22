import {getCurve, getNormalCurve, getQuadraticCurve, getTangentCurve} from "./bezier_curve.js";

class Path{
    constructor(segments, delta) {
        this.segments = segments;
        this.delta = delta;
    }

    getPathPosition(){
        let positions = [];

        for (let i=0; i < this.segments.length; i++){
            if (this.segments[i].length===3){
                positions = positions.concat(getQuadraticCurve(this.segments[i], this.delta));
            } else {
                positions = positions.concat(getCurve(this.segments[i], this.delta));
            }
        }

        return positions;
    }

    getPathNormals(){
        let normals = [];

        for (let i=0; i < this.segments.length; i++){
            normals = normals.concat(getNormalCurve(this.segments[i], this.delta));
        }

        return normals;
    }

    getPathTangents(){
        let tangents = [];

        for (let i=0; i < this.segments.length; i++){
            tangents = tangents.concat(getTangentCurve(this.segments[i], this.delta));
        }

        return tangents;
    }
}

export {Path}