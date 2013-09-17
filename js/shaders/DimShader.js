/**
 * @author mrdoob / http://www.mrdoob.com
 *
 * Simple test shader
 */

THREE.DimShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },

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

		"void main() {",

			"vec4 texel = texture2D( tDiffuse, vUv );",

  			"gl_FragColor = vec4(texel.x, texel.y, texel.z, texel.w);",

		"}"

	].join("\n")

};
