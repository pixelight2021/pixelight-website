<template>
    <!-- <div class="relative grow"> -->
        <canvas id="three-canvas" class="fixed left-0 top-0"></canvas>
        <span id="pointer" class="fixed z-10 bg-red-400 w-4 h-4 rounded-[50%]"></span>
    <!-- </div> -->
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

onMounted(() => {
    const canvas = document.querySelector('#three-canvas')
    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xF5F5F5)

    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false;
    controls.enableDamping = true
    controls.dampingFactor = 0.08

    let mesh
    const loader = new GLTFLoader();
    loader.load('/gltf/logo.gltf',
        //onload
        function (gltf) {
            mesh = gltf.scene.children[0]
            mesh.material = new THREE.MeshBasicMaterial({ color: 'blue' })
            scene.add(mesh)
        },
        //onProgress
        undefined,
        //onError
        function (error) {
            console.error(error);
        });

    camera.position.z = 5

    // const workAnchor = new THREE.Vector3(1, 0.85, 0)
    // const contactAnchor = new THREE.Vector3(0, 1.25, 0)

    animate()

    function animate() {
        requestAnimationFrame(animate)
        controls.update()
        render()
    }

    function render() {
        renderer.render(scene, camera)
        updateAnchors()
    }

    function updateAnchors() {
        const aboutAnchor = new THREE.Vector3(-1.5, -0.09, -0.08)
        aboutAnchor.project(camera)
        const x = Math.round((0.5 + aboutAnchor.x / 2) * (canvas.width));
        const y = Math.round((0.5 - aboutAnchor.y / 2) * (canvas.height));

        document.getElementById('pointer').style.left = `${x}px`
        document.getElementById('pointer').style.top = `${y}px`
    }
})
</script>

<style>
/* #three-canvas {
    position: absolute;
} */
</style>