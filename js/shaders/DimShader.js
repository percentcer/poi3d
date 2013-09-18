/**
 * @author mrdoob / http://www.mrdoob.com
 *
 * Simple test shader
 */

THREE.DimShader = {

	uniforms: {

		"tDiffuse"     : { type: "t", value: null },
		"prevTDiffuse" : { type: "t", value: null },

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"varying vec2 vUv;",

		"uniform sampler2D tDiffuse;",
		"uniform sampler2D prevTDiffuse;",

		"void main() {",

			"vec4 texel = texture2D( prevTDiffuse, vUv );",

  			"gl_FragColor = vec4(texel.x * 0.8, texel.y * 0.4, texel.z * 0.8, texel.w * 0.8);",

		"}"

	].join("\n")

};