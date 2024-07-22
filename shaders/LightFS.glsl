precision highp float;

uniform vec3 punctualColor;

void main(void) {

    gl_FragColor = vec4(punctualColor.xyz * 5.,1.0);
}