import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export async function loadMap2ID(scene, url) {
  const text = await fetch(url).then(r => r.text());
  if (!text.startsWith("MAP2ID")) {
    console.error("Invalid map file");
    return;
  }

  // Simple flat floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(20, 1, 20),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  floor.position.y = -0.5;
  scene.add(floor);

  console.log("Loaded .map2id map!");
}
