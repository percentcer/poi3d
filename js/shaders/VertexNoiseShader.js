/**
 * @author mrdoob / http://www.mrdoob.com
 *
 * Simple test shader
 */

THREE.VertexNoiseShader = {

	uniforms: {
		"tDiffuse"     : { type: "t", value: null },
		"rx"           : { type: "f", value: Math.random() },
		"ry"           : { type: "f", value: Math.random() },
		"noise"        : { type: "f", value: Math.random() }
	},

	vertexShader: [

		"varying vec2 vUv;",

		"uniform float rx;",
		"uniform float ry;",
		"uniform float noise;",

        "float prevNoise = noise;",

		"float _rand( vec2 co ) {",

			"return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",

		"}",

        "float rand() {",
            "prevNoise = _rand( vec2( prevNoise ) );",
            "return prevNoise;",
        "}",

		"void main() {",

			"vUv = uv;",

            "vec3 noisyOffset = vec3( rand(), rand(), rand() ) / 4.0;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position + noisyOffset, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",

			"gl_FragColor = texture2D( tDiffuse, vUv );",

		"}"

	].join("\n")

};
