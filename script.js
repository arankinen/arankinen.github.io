window.onload = function() {
	var renderer,
	scene,
	camera,
	cameraRadius = 200,
	cameraTarget,
	particleSystem,
	cameraX = 0,
	cameraY = 0,
	cameraZ = cameraRadius,
	clock,
	parameters,
	onParametersUpdate,
	contentHeight = 600,
	velocity = 0.0005;

	init();
	animate();

	function init() {
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, contentHeight );
		renderer.setClearColor( new THREE.Color( 0x122232 ), 1.0 );
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 10000 );
		cameraTarget = new THREE.Vector3( 0, 0, 0 );
		
		var numParticles = 2500,
		width = 500,
		height = 500,
		depth = 1000,
		systemGeometry = new THREE.Geometry(),
		systemMaterial = new THREE.ParticleBasicMaterial({ color: 0xa6b8ca });
			
		for( var i = 0; i < numParticles; i++ ) {
			var vertex = new THREE.Vector3(
				  rand( width ),
					rand( height ),
					rand( depth )
				);
			systemGeometry.vertices.push( vertex );
		}
		
		particleSystem = new THREE.ParticleSystem( systemGeometry, systemMaterial );
		clock = new THREE.Clock();
		scene.add( particleSystem );
		document.getElementById( 'threejs' ).appendChild( renderer.domElement );
		
		// Call windows resize function
	  window.addEventListener( 'resize', onWindowResize, false );
	}
	
  function onWindowResize() {
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, contentHeight );
    render();
  }
	
	function rand( v ) {
		return (v * (Math.random() - 0.5));
	}

	function animate() {
		requestAnimationFrame( animate );
		var t = Date.now() * velocity;
		camera.position.set( cameraX, cameraY, cameraZ );
		camera.position.set( 2*cameraRadius * Math.sin( t ), 2*cameraZ + Math.cos( 2*t ), cameraZ + Math.cos( t ) );
		camera.lookAt( cameraTarget );
		renderer.clear();
		renderer.render( scene, camera );
	}

};

$('#upButton').fadeOut(0);

$(window).scroll(function() {
  if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
	$('#upButton').fadeIn(1500);
  }
  else if ($(window).scrollTop() <= 100) {
	$('#downButton').fadeIn(1500);
  }
});

$('#downButton').click(function() {
  $('html, body').animate({
    scrollTop: $('#contact').offset().top
  }, 1000);
	$('#downButton').fadeOut('slow');
	$('#upButton').fadeIn(1500);
});

$('#upButton').click(function() {
  $('html, body').animate({
    scrollTop: $('#threejs').offset().top
  }, 1000);
	$('#upButton').fadeOut('slow');
	$('#downButton').fadeIn(1000);
});
