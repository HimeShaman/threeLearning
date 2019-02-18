const scene = new THREE.Scene();
let loader = new THREE.Loader();
stars = loader.load('galaxy_starfield.png');
scene.backround = stars;

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  2000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 100);

const light = new THREE.AmbientLight(0x888888);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xfdfcf0, 1);
light2.position.set(20, 10, 20);
scene.add(light2);

const jupiter = creerAstre({
  rayon: 10,
  wSegments: 50,
  hSegments: 50,
  colorAstre: 0xbf856c,
  mapAstreURL: "jupitermap.jpg",
  x: 0,
  y: 0,
  z: 0
});
scene.add(jupiter);

const io = creerAstre({
  rayon: 3,
  wSegments: 50,
  hSegments: 50,
  colorAstre: 0xa5a246,
  shininess: 20,
  x: 0,
  y: 0,
  z: 20
});
const ioOrbite = creerTraceOrbite(jupiter, io, {});
scene.add(io);
scene.add(ioOrbite);

const europa = creerAstre({
  rayon: 3.5,
  wSegments: 50,
  hSegments: 50,
  colorAstre: 0x9a7c54,
  shininess: 10,
  x: 0,
  y: 0,
  z: 30
});
const europaOrbite = creerTraceOrbite(jupiter, europa, {});
scene.add(europa);
scene.add(europaOrbite);

const ganymede = creerAstre({
  rayon: 3.5,
  wSegments: 50,
  hSegments: 50,
  colorAstre: 0x918a7f,
  shininess: 25,
  x: 0,
  y: 0,
  z: 50
});

const ganymedeOrbite = creerTraceOrbite(jupiter, ganymede, {});
scene.add(ganymede);
scene.add(ganymedeOrbite);

const callisto = creerAstre({
  rayon: 4,
  wSegments: 50,
  hSegments: 50,
  colorAstre: 0x4b3a28,
  shininess: 25,
  x: 0,
  y: 0,
  z: 70
});
const callistoOrbite = creerTraceOrbite(jupiter, callisto, {});
scene.add(callisto);
scene.add(callistoOrbite);

let orbit = new THREE.OrbitControls(camera, renderer.domElement);
let coeff = 1;

const render = function() {
  jupiter.rotation.y += 0.0015 * coeff;
  date = Date.now() * 0.001;
  
  io.position.set(
    Math.cos(date * coeff) * ioOrbite.geometry.parameters.radius,
    0,
    Math.sin(date * coeff) * ioOrbite.geometry.parameters.radius,
  );

  europa.position.set(
    Math.cos(date * 0.8 * coeff) * europaOrbite.geometry.parameters.radius,
    0,
    Math.sin(date * 0.8 * coeff) * europaOrbite.geometry.parameters.radius
  );

  ganymede.position.set(
    Math.cos(date * 0.5 * coeff) * ganymedeOrbite.geometry.parameters.radius,
    0,
    Math.sin(date * 0.5 * coeff) * ganymedeOrbite.geometry.parameters.radius
  );

  callisto.position.set(
    Math.cos(date * 0.3 * coeff) * callistoOrbite.geometry.parameters.radius,
    0,
    Math.sin(date * 0.3 * coeff) * callistoOrbite.geometry.parameters.radius
  );

  ioOrbite.visible = europaOrbite.visible = ganymedeOrbite.visible = callistoOrbite.visible = showOrbit;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('container').prepend(renderer.domElement);
    document.getElementById('showOrbit').checked = showOrbit;

    document.getElementById('showOrbit').onclick = (event) => {
        showOrbit = !showOrbit;

        render();
    }

    document.getElementById('range').oninput = (event) => {
        coeff = event.target.value;
        render();
    }

});




