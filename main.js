import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

import { Portal } from './engine/portals.js';
import { EnergyPellet } from './engine/energyPellets.js';
import { Funnel } from './engine/funnels.js';
import { Gel } from './engine/gels.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0,2,5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Loading map placeholder
const loading = document.getElementById('loading');
loadMap2ID('./assets/maps/example.map2id', loading);

// --- Gameplay mechanics placeholders ---
const bluePortal = new Portal(scene, new THREE.Vector3(5, 1, 0), "blue");
const orangePortal = new Portal(scene, new THREE.Vector3(-5, 1, 0), "orange");
bluePortal.link(orangePortal);
orangePortal.link(bluePortal);

const pellet = new EnergyPellet(scene, new THREE.Vector3(0,1,0), new THREE.Vector3(0.5,1,0));
const funnel = new Funnel(scene, new THREE.Vector3(0,0,0));
const propulsionGel = new Gel("propulsion");

// --- Player movement ---
const player = camera; // simple placeholder
const velocity = new THREE.Vector3();

document.addEventListener('keydown', (e) => {
    if(e.key === "w") velocity.z = -0.1;
    if(e.key === "s") velocity.z = 0.1;
    if(e.key === "a") velocity.x = -0.1;
    if(e.key === "d") velocity.x = 0.1;
    if(e.key === "p") bluePortal.checkTeleport(player);
});

document.addEventListener('keyup', (e) => {
    if(["w","a","s","d"].includes(e.key)) velocity.set(0,0,0);
});

// --- Map loader ---
async function loadMap2ID(path, loadingElement) {
    try {
        const res = await fetch(path);
        const text = await res.text();

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff99 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        loadingElement?.remove();
        console.log('Map loaded:', text);
    } catch(err) {
        loadingElement.innerText = 'Failed to load map!';
        console.error(err);
    }
}

// --- Animate loop ---
function animate() {
    requestAnimationFrame(animate);

    const delta = 0.016;

    // Player movement
    player.position.add(velocity);

    // Update mechanics
    bluePortal.checkTeleport(player);
    orangePortal.checkTeleport(player);
    pellet.update(delta);
    funnel.apply(player, delta);
    propulsionGel.apply(player, delta);

    renderer.render(scene, camera);
}
animate();
