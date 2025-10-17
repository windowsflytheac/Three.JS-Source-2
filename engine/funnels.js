import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export class Funnel {
  constructor(scene, position, direction = new THREE.Vector3(0, 1, 0), size = new THREE.Vector3(2, 5, 2)) {
    this.scene = scene;
    this.direction = direction.clone().normalize();
    this.size = size;

    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    scene.add(this.mesh);
  }

  apply(player, delta) {
    const box = new THREE.Box3().setFromObject(this.mesh);
    if (box.containsPoint(player.position)) {
      player.position.addScaledVector(this.direction, delta * 2);
    }
  }

  remove() {
    this.scene.remove(this.mesh);
  }
}
