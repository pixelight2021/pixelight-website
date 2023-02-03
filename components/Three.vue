<template>
    <canvas id="three-canvas" class="fixed left-0 top-0" @mousedown="handleMouseDown" @mouseup="handleMouseUp"></canvas>
</template>

<script setup>
import { onMounted } from 'vue';

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const isDrag = ref(false)

onMounted(() => {
    const canvas = document.querySelector('#three-canvas')
    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xF5F5F5)

    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)

    const math = THREE.MathUtils
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false;
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.maxAzimuthAngle = 30 * math.DEG2RAD
    controls.minAzimuthAngle = -30 * math.DEG2RAD
    controls.maxPolarAngle = 120 * math.DEG2RAD
    controls.minPolarAngle = 60 * math.DEG2RAD

    let mesh
    const loader = new GLTFLoader();

    const clock = new THREE.Clock()
    const uniformData = {
        u_time: {
            type: 'f',
            value: 0
        },
    }

    loader.load('/gltf/logo.gltf',
        //onload
        function (gltf) {
            mesh = gltf.scene.children[0]
            // mesh.material = new THREE.MeshBasicMaterial({ color: 'blue' })
            mesh.material = new THREE.ShaderMaterial({
                uniforms: uniformData,
                vertexShader: `
                    varying vec3 vPosition;
                    varying vec3 vNormal;

                    void main()	{
                        vec4 result;
                        vPosition = position;
                        vNormal = normal;
                        result = vec4(position, 1.0);
                        gl_Position = projectionMatrix * modelViewMatrix * result;
                    }
                `,
                fragmentShader: `
                    #define PI 3.14159265359

                    uniform float u_time;

                    varying vec3 vPosition;
                    varying vec3 vNormal;

                    vec3 c0 = vec3(1.0, 0.729, 0.741);
                    vec3 c1 = vec3(0.988, 1.0, 0.0);
                    vec3 c2 = vec3(0.274, 1.0, 0.956);
                    vec3 c3 = vec3(0.423, 0.631, 0.968);

                    void main() {
                        // float r = pow(sin(vPosition.x + u_time * 0.5), 2.0);
                        // float g = pow(sin(vPosition.x + u_time * 0.2) + 0.5, 2.0);
                        // float b = pow(sin(vPosition.x + u_time * 0.7) + 0.3, 2.0);

                        // vec3 color = vec3(r, g, b);
                        
                        float x = vPosition.x + 0.5 + (u_time * 0.2);
                        vec3 color = vec3(0);
                        color = mix(c0, c1, smoothstep(0.0, 0.288, fract(x)));
                        color = mix(color, c2, smoothstep(0.288, 0.516, fract(x)));
                        color = mix(color, c3, smoothstep(0.516, 0.8, fract(x)));
                        color = mix(color, c0, smoothstep(0.8, 1.0, fract(x)));
                        
                        color = color * (1.0 - abs(vec3(vNormal.z))) + abs(vec3(vNormal.z));

                        gl_FragColor = vec4(color, 1.0);
                    }
                `
            })
            mesh.rotation.set(-30 * math.DEG2RAD, 0, 15 * math.DEG2RAD)
            scene.add(mesh)
        },
        //onProgress
        undefined,
        //onError
        function (error) {
            console.error(error);
        });

    camera.position.z = 1.45
    controls.saveState()

    animate()

    function animate() {
        requestAnimationFrame(animate)
        
        /* update shader */        
        uniformData.u_time.value = clock.getElapsedTime()

        controls.update()
        renderer.render(scene, camera)

        updateCamera()
        updateAnchors()
    }

    function updateCamera() {
        if(isDrag.value) return

        camera.position.lerp(new THREE.Vector3(0, 0, 1.45), 0.1)
    }
    
    function updateAnchors() {
        updateAnchor(document.getElementById('about'), new THREE.Vector3(-0.43, -0.08, 0.055))
        updateAnchor(document.getElementById('works'), new THREE.Vector3(0.21, 0.335, -0.2))
        updateAnchor(document.getElementById('contact'), new THREE.Vector3(0.39, -0.175, 0.13))
    }
    
    function updateAnchor(anchor, initPos) {
        initPos.project(camera)
        const x = Math.round((0.5 + initPos.x / 2) * (canvas.width));
        const y = Math.round((0.5 - initPos.y / 2) * (canvas.height));

        anchor.style.left = `${x}px`
        anchor.style.top = `${y}px`
    }
})

function handleMouseDown(e) {
    isDrag.value = true
}
function handleMouseUp(e) {
    isDrag.value = false
}
</script>

