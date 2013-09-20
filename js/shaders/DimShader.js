/**
 * @author mrdoob / http://www.mrdoob.com
 *
 * Simple test shader
 */

THREE.DimShader = {

	uniforms: {

		"tDiffuse"     : { type: "t", value: null },
		"prevTDiffuse" : { type: "t", value: null },
		"scaleRate"    : { type: "f", value: 0.95 }

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
		"uniform float scaleRate;",

		"vec4 forcedDifferentiation( vec4 old, vec4 new ) {",

			"ivec4 iold = ivec4( ceil( old * 255.0 ) );",

			"ivec4 inew = ivec4( ceil( new * 255.0 ) );",

			"if ( all( equal( iold.rgb, inew.rgb ) ) ) {",

				"return vec4( ivec4( inew.rgb - ivec3(1), inew.a ) ) / 255.0;",

			"} else {",

				"return new;",

			"}",

		"}",

		"void main() {",

			"vec4 texel = texture2D( prevTDiffuse, vUv );",

			"vec4 nextTexel = vec4( texel.rgb * scaleRate, texel.a );",

			"vec4 result    = forcedDifferentiation( texel, nextTexel );",

			"gl_FragColor   = result;",

		"}"

	].join("\n")

};
