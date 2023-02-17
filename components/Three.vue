<template>
    <canvas id="three-canvas" class="fixed -mt-[40px] left-0 top-0 w-full h-full" @mousedown="handleMouseDown" @mouseup="handleMouseUp"></canvas>
</template>

<script setup>
import { map } from '~~/composables/utils'
import { DEVICE_SIZE } from '~~/composables/device'
import { PAGE, VIEW_TYPE } from '~~/composables/editor'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const props = defineProps(['editor'])

const isDrag = ref(false)

const deviceSize = inject('deviceSize')
let mesh, controls, camera, degree

onMounted(() => {
    const canvas = document.querySelector('#three-canvas')
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xF5F5F5)

    camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)

    const math = THREE.MathUtils

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false;
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.maxAzimuthAngle = 30 * math.DEG2RAD
    controls.minAzimuthAngle = -30 * math.DEG2RAD
    controls.maxPolarAngle = 120 * math.DEG2RAD
    controls.minPolarAngle = 60 * math.DEG2RAD

    const clock = new THREE.Clock()
    const uniformData = {
        u_time: {
            type: 'f',
            value: 0.0
        },
        u_hue: {
            type: 'f',
            value: 0.0
        },
        u_speed: {
            type: 'f',
            value: 0.0
        },
        u_dimmer: {
            type: 'f',
            value: 1.0
        }
    }
    new GLTFLoader().load('/gltf/logo.gltf',
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
                    uniform float u_hue;
                    uniform float u_speed;
                    uniform float u_dimmer;

                    varying vec3 vPosition;
                    varying vec3 vNormal;

                    vec3 hsb2rgb( vec3 c ){
                        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                                                6.0)-3.0)-1.0,
                                        0.0,
                                        1.0 );
                        rgb = rgb*rgb*(3.0-2.0*rgb);
                        return c.z * mix(vec3(1.0), rgb, c.y);
                    }

                    // vec3 c0 = hsb2rgb(1.0, 0.729, 0.741);
                    // vec3 c1 = hsb2rgb(0.988, 1.0, 0.0);
                    // vec3 c2 = hsb2rgb(0.274, 1.0, 0.956);
                    // vec3 c3 = hsb2rgb(0.423, 0.631, 0.968);
                    
                    void main() {
                        // float r = pow(sin(vPosition.x + u_time * 0.5), 2.0);
                        // float g = pow(sin(vPosition.x + u_time * 0.2) + 0.5, 2.0);
                        // float b = pow(sin(vPosition.x + u_time * 0.7) + 0.3, 2.0);
                        
                        // vec3 color = vec3(r, g, b);

                        vec3 c0 = hsb2rgb(vec3(0.991 + u_hue, 0.271, 1.0));
                        vec3 c1 = hsb2rgb(vec3(0.169 + u_hue, 1.0, 1.0));
                        vec3 c2 = hsb2rgb(vec3(0.488 + u_hue, 0.725, 1.0));
                        vec3 c3 = hsb2rgb(vec3(0.602 + u_hue, 0.563, 0.969));
                        
                        float x = vPosition.x + 0.5 + (u_time * u_speed);
                        vec3 color = vec3(0);
                        color = mix(c0, c1, smoothstep(0.0, 0.288, fract(x)));
                        color = mix(color, c2, smoothstep(0.288, 0.516, fract(x)));
                        color = mix(color, c3, smoothstep(0.516, 0.8, fract(x)));
                        color = mix(color, c0, smoothstep(0.8, 1.0, fract(x)));

                        color = mix(vec3(0.92), color, u_dimmer);
                        
                        color = color * (1.0 - abs(vec3(vNormal.z))) + abs(vec3(vNormal.z));

                        gl_FragColor = vec4(color, 1.0);
                    }
                `
            })
            /* add anchors */

            const anchorDegrees = [180, 45, 315]
            anchorDegrees.forEach(d => {
                const anchor = new THREE.Object3D()
                anchor.position.set(Math.cos(d * math.DEG2RAD) * 0.42, Math.sin(d * math.DEG2RAD) * 0.42, 0)
                mesh.add(anchor)
            })

            /* add bake shadow */
            new THREE.TextureLoader().load(
                'texture/logoShadow.png',
                function (tex) {
                    const geometry = new THREE.PlaneGeometry(1.2, 1.2)
                    const material = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.2 })
                    const plane = new THREE.Mesh(geometry, material)
                    plane.position.z = -0.05
                    mesh.add(plane)
                },
                undefined,
                function (err) {
                    console.error(err)
                }
            )

            mesh.rotation.set(-20 * math.DEG2RAD, 0, 10 * math.DEG2RAD)
            scene.add(mesh)
        },
        undefined,
        function (error) {
            console.error(error);
        })
    animate()

    function animate() {
        requestAnimationFrame(animate)

        /* update shader */
        uniformData.u_time.value = clock.getElapsedTime()
        uniformData.u_hue.value = props.editor.hue
        uniformData.u_speed.value = props.editor.speed
        uniformData.u_dimmer.value = props.editor.dimmer

        if (props.editor.viewType == VIEW_TYPE.OVERVIEW) controls.update()
        renderer.render(scene, camera)

        updateCamera()
        updateAnchors()
    }

    function updateCamera() {
        if (isDrag.value) return

        if (props.editor.viewType == VIEW_TYPE.OVERVIEW) {
            const maxOff = 0.9 // max camera distance 
            const minOff = 1.6 //min camera distance
            const z = map(deviceSize.value, DEVICE_SIZE.XS, DEVICE_SIZE.XXXL, minOff, maxOff)
            camera.position.lerp(new THREE.Vector3(0, 0, z), 0.1)
        }

        if (props.editor.viewType == VIEW_TYPE.ROADVIEW) {
            camera.position.lerp(new THREE.Vector3(Math.cos(degree + 210 * math.DEG2RAD) * 0.2, 0.3, -Math.sin(degree + 210 * math.DEG2RAD) * 0.2), 0.1)
            camera.lookAt(new THREE.Vector3(Math.cos(degree * math.DEG2RAD) * 0.4, 0, -Math.sin(degree * math.DEG2RAD) * 0.4))
        }
    }

    function updateAnchors() {
        if (!mesh || props.editor.viewType != VIEW_TYPE.OVERVIEW) return

        for (let i = 0; i < mesh.children.length - 1; i++) {
            updateAnchor(document.getElementById(PAGE[i]), mesh.children[i].getWorldPosition(new THREE.Vector3()))
        }
    }

    function updateAnchor(anchor, pos) {
        if (!anchor) return

        pos.project(camera)
        const x = Math.round((0.5 + pos.x / 2) * (window.innerWidth));
        const y = Math.round((0.5 - pos.y / 2) * (window.innerHeight));

        anchor.style.left = `${x}px`
        anchor.style.top = `${y -40}px`
    }

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
})

watch(props.editor, () => {
    switch (props.editor.viewType) {
        case VIEW_TYPE.OVERVIEW:
            controls.enabled = true
            mesh.rotation.set(-20 * THREE.MathUtils.DEG2RAD, 0, 10 * THREE.MathUtils.DEG2RAD)
            break;
        case VIEW_TYPE.ROADVIEW:
            controls.enabled = false
            mesh.rotation.set(-90 * THREE.MathUtils.DEG2RAD, 0, 0)
            switch (PAGE.indexOf(props.editor.page)) {
                case 0:
                    degree = 180
                    break;
                case 1:
                    degree = 45
                    break;
                case 2:
                    degree = 315
                    break;
            }
            break;
    }
})

function handleMouseDown(e) {
    isDrag.value = true
}

function handleMouseUp(e) {
    isDrag.value = false
}
</script>

