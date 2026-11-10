// Bird.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export async function loadBird(modelPath = 'models/Flamingo.glb', position = { x: 0, y: 30, z: -50 }, scale = 0.3) {
    const loader = new GLTFLoader();
    const gltfData = await loader.loadAsync(modelPath);

    const model = gltfData.scene;
    // Unique naming prefix to help handle drag controls and tracking easily
    model.name = "Bird_" + Math.random().toString(36).slice(2);

    // Position and scale the model for your CAVE scene units
    model.position.set(position.x, position.y, position.z);
    model.scale.set(scale, scale, scale);

    // Setup animation mixer for wing-flapping
    const mixer = new THREE.AnimationMixer(model);
    if (gltfData.animations.length > 0) {
        const action = mixer.clipAction(gltfData.animations[0]);
        action.play();
    }

    // Function to update animation using a shared delta time
    function tick(delta) {
        mixer.update(delta);
    }

    return { model, tick };
}