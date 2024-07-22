precision highp float;

uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosWorld;

vec3 lightVec;
vec3 diffColor;
vec3 color;

varying highp vec2 vUv;

vec2 uvScaled;

uniform float uScale;
uniform float vScale;
uniform sampler2D uSampler;

uniform vec3 uViewerPosition;
uniform float uGlossiness;
uniform float uKsFactor;

uniform vec3 directColor;
uniform vec3 punctualColor;
uniform vec3 ia;

uniform vec3 uProjectilePos;

// Iluminacion ambiental de Phong
vec3 phongAmbientIllumination(vec4 textureColor) {
    vec3 ka = textureColor.xyz;
    vec3 ambientIllumination = ka * ia;

    return ambientIllumination;
}

// Iluminacion puntual de Phong
vec3 puntualPhong(vec3 lightPos, vec4 textureColor) {

    vec3 lightVec = normalize(lightPos - vPosWorld);

    float linearDecay = clamp(2.0 - length(lightPos - vPosWorld) * 2.0, 0.0, 99999.0);

    vec3 lightColor = punctualColor * linearDecay;

    // Iluminacion difusa de Phong
    vec3 kd = textureColor.xyz;
    vec3 id = lightColor;
    vec3 diffuseIllumination = clamp(dot(lightVec, vNormal), 0.0, 1.0)*kd*id;

    // Iluminacion especular de Phong
    vec3 ks = vec3(1.0,1.0,1.0);
    vec3 is = lightColor;
    vec3 viewerVector = normalize(uViewerPosition - vPosWorld);
    vec3 reflectionVector = reflect(-lightVec, vNormal);
    float RdotV = clamp(dot(reflectionVector, viewerVector), 0.0, 1.0);
    vec3 specularIllumination = pow(RdotV, uGlossiness)*ks*is*uKsFactor;

    vec3 phongIllumination = diffuseIllumination + specularIllumination;
    return phongIllumination;
}

// Iluminacion direccional de Phong
vec3 directPhong(vec3 lightVec, vec4 textureColor) {

    // Iluminacion difusa de Phong
    vec3 kd = textureColor.xyz;
    vec3 id = directColor;
    vec3 diffuseIllumination = clamp(dot(lightVec, vNormal), 0.0, 1.0)*kd*id;

    // Iluminacion especular de Phong
    vec3 ks = vec3(1.0,1.0,1.0);
    vec3 is = directColor;
    vec3 viewerVector = normalize(uViewerPosition - vPosWorld);
    vec3 reflectionVector = reflect(-lightVec, vNormal);
    float RdotV = clamp(dot(reflectionVector, viewerVector), 0.0, 1.0);
    vec3 specularIllumination = pow(RdotV, uGlossiness)*ks*is*uKsFactor;

    vec3 phongIllumination = diffuseIllumination + specularIllumination;
    return phongIllumination;
}

void main(void) {

    uvScaled.x = vUv.x * uScale;
    uvScaled.y = vUv.y * vScale;

    vec4 textureColor = texture2D(uSampler,uvScaled);
    vec3 sunDirection = normalize( vec3(1.0,1.0,1.0) );
    vec3 lightPos1 = vec3(-0.4,0.0675,0.5);
    vec3 lightPos2 = vec3(0.4,0.0675,0.6);

    vec3 ambientIllumination = phongAmbientIllumination(textureColor);
    vec3 directIlumination = directPhong(sunDirection,textureColor);
    vec3 puntualIlumination1 = puntualPhong(lightPos1,textureColor);
    vec3 puntualIlumination2 = puntualPhong(lightPos2,textureColor);
    vec3 projectileIlumination = puntualPhong(uProjectilePos,textureColor);

    vec3 resultColor = ambientIllumination + directIlumination + puntualIlumination1 + puntualIlumination2 + projectileIlumination;

    gl_FragColor = vec4(resultColor.xyz,1.0);
}