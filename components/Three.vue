<template>
    <!-- <div class="relative grow"> -->
    <canvas id="three-canvas" class="fixed left-0 top-0"></canvas>
    <div id="pointer" @mouseover="hover = true" @mouseleave="hover = false">
        <nuxt-img v-show="hover" class="rounded-full rotate-[-45deg]" src="jpg/bird.jpg" />
    </div>
    <!-- </div> -->
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const hover = ref(false)

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
            // mesh.material = new THREE.MeshBasicMaterial({ color: 'blue' })
            mesh.material = new THREE.ShaderMaterial({
                // wireframe: true,
                // normalMap: true,
                vertexShader: `
                    varying vec3 vPosition;
                    varying vec3 vNormal;

                    void main()	{
                        vec4 result;
                        vNormal = normal;
                        vPosition = position;
                        result = vec4(position, 1.0);
                        gl_Position = projectionMatrix * modelViewMatrix * result;
                    }
                `,
                fragmentShader: `
                    #define PI 3.14159265359

                    varying vec3 vPosition;
                    varying vec3 vNormal;

                    void main() {

                        gl_FragColor = vec4(sin(vPosition.x * PI), 0.0, 0.0, 1.0) * (vec4(1.0, 1.0, 1.0, 1.0) - vec4(abs(vNormal.zzz), 0.0)) + vec4(abs(vNormal.zzz), 1.0);
                        // gl_FragColor = vec4(abs(vNormal.zzz), 1.0);
                    }
                `
            })
            scene.add(mesh)
        },
        //onProgress
        undefined,
        //onError
        function (error) {
            console.error(error);
        });

    camera.position.z = 5

    // camera.position.set(0, -3, 1.5)
    // camera.rotation.x = Math.PI / 2


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
        const aboutAnchor = new THREE.Vector3(-1.5, -0.17, 0)
        // const aboutAnchor = new THREE.Vector3(1.06, 0.9, 0)
        aboutAnchor.project(camera)
        const x = Math.round((0.5 + aboutAnchor.x / 2) * (canvas.width));
        const y = Math.round((0.5 - aboutAnchor.y / 2) * (canvas.height));

        // document.getElementById('pointer').style.transform = `translate(-50%, -50%) rotate(45deg)`
        document.getElementById('pointer').style.left = `${x}px`
        document.getElementById('pointer').style.top = `${y}px`
    }
})
</script>

<style>
#pointer {
    position: fixed;
    z-index: 1;
    aspect-ratio: 1/1;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: black;

    transition: width 0.2s ease-in-out, height 0.2s ease-in-out, border-radius 0.2s ease-in-out;
    width: 5px;
    border-radius: none;
}

#pointer:hover {
    width: 120px;
    border-radius: 50%;
}

#pointer::after {
    content: '';
    display: block;
    position: absolute;
    border: 1px solid black;
    border-radius: 50%;
    aspect-ratio: 1/1;
    width: 24px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    transition: all 0.2s ease-in-out;
}

#pointer:hover::after {
    width: 140px;
    border-color: white;
}
</style>