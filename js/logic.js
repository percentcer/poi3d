var scene, camera, renderer, controls, composer, dotScreenShade;

var USE_SHADERS = true;
var CLEAR       = false;

init();
animate();

var fadeRate    = [ 0, 0.75, 0.95, 0.995, 0.9995 ];
var currentFade =            2;

function init() {
	var WIDTH, HEIGHT;

	scene  = new THREE.Scene();
	WIDTH  = window.innerWidth;
	HEIGHT = window.innerHeight;

	renderer = new THREE.WebGLRenderer({
		preserveDrawingBuffer : !CLEAR
	});

	renderer.autoClearColor = CLEAR;
	renderer.setSize( WIDTH, HEIGHT );

	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', function () {
		var 
		WIDTH  = window.innerWidth,
		HEIGHT = window.innerHeight;

		renderer.setSize( WIDTH, HEIGHT );

		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});

	// --- LIGHTS ---------
	var light0 = new THREE.AmbientLight( 0xffffff );//HemisphereLight( 0xd0d0d0, 0x303030 );
	scene.add( light0 );

	// --- CAMERA ---------
	camera = new THREE.PerspectiveCamera( 45, WIDTH/HEIGHT, 0.1, 20000 );
	camera.position.set( 0, 4, 0 );
	scene.add( camera );

	// --- GEOM -----------
	var loader = new THREE.JSONLoader();
	loader.load ( "models/dodeca-wire.js", function( geo ) {
		var material = new THREE.MeshLambertMaterial({ color : 0xffffff, shading : THREE.FlatShading }),
			mesh     = new THREE.Mesh( geo, material );

		scene.add(mesh);
	});

	// --- ACTION ----------
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.noPan = true;

	// --- POST ------------
	composer  = new THREE.EffectComposer( renderer );

	shDim = new THREE.ShaderPass( THREE.DimShader );
	composer.addPass( shDim );

	var scenePass  = new THREE.RenderPass( scene, camera );
	composer.addPass( scenePass );

	// dotScreenShade  = last = new THREE.ShaderPass( THREE.DotScreenShader );
	// composer.addPass( last );

	// colShad         = last = new THREE.ShaderPass( THREE.ColorifyShader );
	// composer.addPass( last );

	var shCopy = new THREE.ShaderPass( THREE.CopyShader );
	composer.addPass( shCopy );

	shCopy.renderToScreen = true;
}

function animate() {
	requestAnimationFrame ( animate );

	if ( USE_SHADERS ) {
		var rad = 100 + Math.random() * 300;
		// dotScreenShade.uniforms[ 'tSize' ].value = new THREE.Vector2( rad, rad );
		// colShad.uniforms.color.value = new THREE.Color( 0xffffff * Math.random() );
		shDim.uniforms[ 'prevTDiffuse' ].value = composer.writeBuffer;
		composer.render();
	} else {
		renderer.render( scene, camera );
	}

	controls.update();	
}

function onKeyDown( event ) {
	switch ( event.keyCode ) {
		case 32:
			USE_SHADERS = !USE_SHADERS;
			break;
		case 33:
			currentFade++;
			if ( currentFade >= fadeRate.length ) {
				currentFade = fadeRate.length - 1;
			}
			shDim.uniforms[ 'scaleRate' ].value = fadeRate[ currentFade ];
			break;
		case 34:
			currentFade--;
			if ( currentFade < 0 ) {
				currentFade = 0;
			}
			shDim.uniforms[ 'scaleRate' ].value = fadeRate[ currentFade ];
			break;
	}
}

window.addEventListener( 'keydown', onKeyDown, false );
