import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

let camera, velocity = new THREE.Vector3(), direction = new THREE.Vector3();
const speed = 0.1;
const keys = {};

export function setupPlayer(cam) {
  camera = cam;
  camera.position.set(0, 2, 5);

  document.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
  document.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

  // Mouse look
  document.body.requestPointerLock =
    document.body.requestPointerLock || document.body.mozRequestPointerLock;
  document.body.addEventListener("click", () => document.body.requestPointerLock());

  let pitch = 0, yaw = 0;
  document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement === document.body) {
      yaw -= e.movementX * 0.002;
      pitch -= e.movementY * 0.002;
      pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
      camera.rotation.set(pitch, yaw, 0);
    }
  });
}

export function updatePlayer() {
  if (!camera) return;

  direction.set(0, 0, 0);
  if (keys["w"]) direction.z -= 1;
  if (keys["s"]) direction.z += 1;
  if (keys["a"]) direction.x -= 1;
  if (keys["d"]) direction.x += 1;

  direction.normalize();
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  forward.y = 0;
  forward.normalize();

  const right = new THREE.Vector3().crossVectors(camera.up, forward).normalize().negate();
  camera.position.addScaledVector(forward, direction.z * speed);
  camera.position.addScaledVector(right, direction.x * speed);
}
