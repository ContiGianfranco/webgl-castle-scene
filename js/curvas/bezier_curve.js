let Base0, Base1, Base2, Base3;
let Base0der, Base1der, Base2der, Base3der;

Base0=function(u) { return (1-u)*(1-u)*(1-u);}
Base1=function(u) { return 3*(1-u)*(1-u)*u;}
Base2=function(u) { return 3*(1-u)*u*u;}
Base3=function(u) { return u*u*u; }

Base0der=function(u) { return -3*u*u+6*u-3;}
Base1der=function(u) { return 9*u*u-12*u+3;}
Base2der=function(u) { return -9*u*u+6*u;}
Base3der=function(u) { return 3*u*u;}

let BaseCuad0=function(u) { return (1-u)*(1-u);}
let BaseCuad1=function(u) { return 2*u*(1-u); }
let BaseCuad2=function(u) { return u*u;}

function cubicCurve(u,controlPoints){

    const p0 = controlPoints[0];
    const p1 = controlPoints[1];
    const p2 = controlPoints[2];
    const p3 = controlPoints[3];

    let point = {};

    point.x=Base0(u)*p0[0]+Base1(u)*p1[0]+Base2(u)*p2[0]+Base3(u)*p3[0];
    point.y=Base0(u)*p0[1]+Base1(u)*p1[1]+Base2(u)*p2[1]+Base3(u)*p3[1];
    point.z=Base0(u)*p0[2]+Base1(u)*p1[2]+Base2(u)*p2[2]+Base3(u)*p3[2];

    return point;
}

function quadraticCurve(u,controlPoints){

    const p0 = controlPoints[0];
    const p1 = controlPoints[1];
    const p2 = controlPoints[2];

    let point = {};

    point.x=BaseCuad0(u)*p0[0]+BaseCuad1(u)*p1[0]+BaseCuad2(u)*p2[0];
    point.y=BaseCuad0(u)*p0[1]+BaseCuad1(u)*p1[1]+BaseCuad2(u)*p2[1];
    point.z=BaseCuad0(u)*p0[2]+BaseCuad1(u)*p1[2]+BaseCuad2(u)*p2[2];

    return point;
}

function cubicDer(u,controlPoints){

    const p0 = controlPoints[0];
    const p1 = controlPoints[1];
    const p2 = controlPoints[2];
    const p3 = controlPoints[3];

    let point = {};

    point.x=Base0der(u)*p0[0]+Base1der(u)*p1[0]+Base2der(u)*p2[0]+Base3der(u)*p3[0];
    point.y=Base0der(u)*p0[1]+Base1der(u)*p1[1]+Base2der(u)*p2[1]+Base3der(u)*p3[1];
    point.z=Base0der(u)*p0[2]+Base1der(u)*p1[2]+Base2der(u)*p2[2]+Base3der(u)*p3[2];

    return point;
}

function cubicNormalZ(u,controlPoints){

    let der;

    if (u===0){
        der = cubicDer(0.0000000001, controlPoints)
    } else {
        der = cubicDer(u, controlPoints)
    }

    let normal = glMatrix.vec3.fromValues(-der.y,der.x,0.0);
    glMatrix.vec3.normalize(normal,normal);

    return normal;
}

function getCurve(controlPoints, delta){

    let points = [];

    for (let u=0; u<=1; u=u+delta){
        let point = cubicCurve(u, controlPoints);

        points.push(point);
    }

    return points;
}

function getQuadraticCurve(controlPoints, delta){
    let points = [];

    for (let u=0; u<=1; u=u+delta){
        let point = quadraticCurve(u, controlPoints);

        points.push(point);
    }

    return points;
}

function getNormalCurve(controlPoints, delta){

    let points = [];

    for (let u=0; u<=1; u=u+delta){
        let point = cubicNormalZ(u, controlPoints);

        points.push(point);
    }

    return points;
}

function getTangentCurve(controlPoints, delta){

    let points = [];

    for (let u=0; u<=1; u=u+delta){
        let point = cubicDer(u, controlPoints);

        points.push(point);
    }

    return points;
}

export {cubicCurve, getCurve, getNormalCurve, getTangentCurve, getQuadraticCurve}