export class Gel {
  constructor(type = "repulsion") {
    this.type = type; // "repulsion" or "propulsion"
    this.targets = []; // array of players / objects affected
  }

  apply(player, delta) {
    if (this.type === "propulsion") {
      player.position.y += delta * 1.5; // simple upward push
    } else if (this.type === "repulsion") {
      player.position.y += delta * 2; // bounce
    }
  }
}
