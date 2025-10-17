export function handleCommand(cmd, camera, scene, renderer) {
  if (cmd.startsWith("/tp")) {
    const args = cmd.split(" ");
    if (args.length === 4) {
      const [_, x, y, z] = args.map(Number);
      if (Math.abs(x) > 1e9 || Math.abs(y) > 1e9 || Math.abs(z) > 1e9) {
        crashRenderer(renderer, "Teleported too far into 64-bit binaries!");
        return;
      }
      camera.position.set(x, y, z);
      console.log(`Teleported to ${x}, ${y}, ${z}`);
    } else {
      console.log("Usage: /tp x y z");
    }
  } else {
    console.log(`Unknown command: ${cmd}`);
  }
}

function crashRenderer(renderer, reason) {
  const ctx = renderer.getContext();
  renderer.setAnimationLoop(null);
  ctx.clearColor(1, 0, 0, 1);
  ctx.clear(ctx.COLOR_BUFFER_BIT);

  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = "40%";
  div.style.left = "10%";
  div.style.color = "#fff";
  div.style.fontFamily = "monospace";
  div.style.fontSize = "20px";
  div.style.textShadow = "2px 2px 0 #000";
  div.innerHTML = `Error has occurred when using command.<br>Reason: ${reason}`;
  document.body.appendChild(div);

  console.error(reason);
}
