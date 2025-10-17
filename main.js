import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { loadMap2ID } from "./engine/mapLoader.js";
import { setupPlayer, updatePlayer } from "./engine/player.js";
import { handleCommand } from "./engine/commands.js";

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Scene + Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Skybox
const loader = new THREE.TextureLoader();
loader.load("./assets/skyboxes/default_sky.jpg", (texture) => {
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(500, 32, 32),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
  );
  scene.add(sky);
});

// Load map
await loadMap2ID(scene, "./assets/maps/test.map2id");

// Player
setupPlayer(camera);

// Console input
const input = document.getElementById("cmdInput");
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    handleCommand(cmd, camera, scene, renderer);
    input.value = "";
  }
});

// Resize
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  updatePlayer();
  renderer.render(scene, camera);
}
animate();
