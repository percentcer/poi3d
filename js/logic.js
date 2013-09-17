var scene, camera, renderer, controls, composer, dotScreenShade;

var USE_SHADERS = true;
var CLEAR       = false;

init();
animate();

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

	camera = new THREE.PerspectiveCamera( 45, WIDTH/HEIGHT, 0.1, 20000 );
	camera.position.set( 0, 4, 0 );
	scene.add( camera );

	window.addEventListener( 'resize', function () {
		var 
		WIDTH  = window.innerWidth,
		HEIGHT = window.innerHeight;

		renderer.setSize( WIDTH, HEIGHT );
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});

	var light0 = new THREE.HemisphereLight( 0xd0d0d0, 0x303030 );
	scene.add( light0 );

	var loader = new THREE.JSONLoader();
	loader.load ( "models/dodeca-wire.js", function( geo ) {
		var material = new THREE.MeshLambertMaterial({ color : 0xffffff, shading : THREE.FlatShading }),
		    mesh     = new THREE.Mesh( geo, material );

	   	scene.add(mesh);
	});

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.noPan = true;

    // post
    composer = new THREE.EffectComposer( renderer );

    var scenePass  = new THREE.RenderPass( scene, camera );
    composer.addPass( scenePass );

    // fancy shaders

    // dotScreenShade  = last = new THREE.ShaderPass( THREE.DotScreenShader );
    // composer.addPass( last );

    // colShad         = last = new THREE.ShaderPass( THREE.ColorifyShader );
    // composer.addPass( last );

    dimShad         = last = new THREE.ShaderPass( THREE.DimShader );
    composer.addPass( last );

    last.renderToScreen            = true;
}

function animate() {
	requestAnimationFrame ( animate );

	if ( USE_SHADERS ) {
		var rad = 100 + Math.random() * 300;
		// dotScreenShade.uniforms[ 'tSize' ].value = new THREE.Vector2( rad, rad );
		// colShad.uniforms.color.value = new THREE.Color( 0xffffff * Math.random() );
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
	}
}

window.addEventListener( 'keydown', onKeyDown, false );

