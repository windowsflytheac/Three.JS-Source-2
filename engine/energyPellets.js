import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export class EnergyPellet {
  constructor(scene, position, velocity) {
    this.scene = scene;
    this.velocity = velocity.clone();

    const geometry = new THREE.SphereGeometry(0.2, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    scene.add(this.mesh);
  }

  update(delta) {
    // simple bouncing logic
    this.mesh.position.addScaledVector(this.velocity, delta);

    // floor collision
    if (this.mesh.position.y < 0.2) {
      this.mesh.position.y = 0.2;
      this.velocity.y *= -1;
    }
  }

  remove() {
    this.scene.remove(this.mesh);
  }
}
