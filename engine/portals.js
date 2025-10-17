import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export class Portal {
  constructor(scene, position, type = "blue") {
    this.scene = scene;
    this.type = type;
    this.linkedPortal = null;

    const texture = new THREE.TextureLoader().load(`./assets/portal_${type}.png`);
    const material = new THREE.SpriteMaterial({ map: texture, color: 0xffffff });
    this.sprite = new THREE.Sprite(material);

    this.sprite.position.copy(position);
    this.sprite.scale.set(2, 4, 1);
    scene.add(this.sprite);
  }

  link(otherPortal) {
    this.linkedPortal = otherPortal;
  }

  checkTeleport(player) {
    if (!this.linkedPortal) return;

    const distance = player.position.distanceTo(this.sprite.position);
    if (distance < 1) { // simple trigger
      player.position.copy(this.linkedPortal.sprite.position).add(new THREE.Vector3(0, 1, 0));
      console.log(`Teleported through ${this.type} portal`);
    }
  }

  remove() {
    this.scene.remove(this.sprite);
  }
}
