import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//fundo onde ficam as coisas
const scene = new THREE.Scene();

//de onde está olhando as coisas(graus de visão, aspecto na tela, pedaço da cena que esta sendo visto)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//cara que faz os elementos da tela aparecerem
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);

//settando para o 3d ser na tela toda
renderer.setSize(window.innerWidth, window.innerHeight);

//perspectiva da camera
camera.position.setZ(30);

//desenha a cena
renderer.render(scene, camera);

//criando um objeto
  //criando uma geometria (x,y,z) para fazer uma forma
  //forma de rosquinha
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//   //textura do objeto
//     //'0x' é a # da hex color no threejs
//     //MeshBasicMaterial não depende da luz, tem que botar ', wireframe: true' de parametro
//     //MeshStandardMaterial depende da luz
// const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
//   //juntar a geomatria e a textura
// const torus = new THREE.Mesh(geometry, material);

// //adiciona o objeto a cena
// scene.add(torus);

//fazendo luz
    //'0x' é a # da hex color no threejs
    //luz focal
const pointLight = new THREE.PointLight(0xffffff);
      //posição da luz focal
pointLight.position.set(5, 5, 5);
    //luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff);
   
//adiciona o objeto a cena
scene.add(pointLight, ambientLight);

//escuta os eventos do mouse e muda a posição da camera de acordo
const controls = new OrbitControls(camera, renderer.domElement);

//função pra renderizar vários elementos ao mesmo tempo
function addStar() {
    //esfera geometrica
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff});
    const star = new THREE.Mesh(geometry, material);

    //gerando posição aleatória pros objetos
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

//adiciona varios objetos na cena
Array(189).fill().forEach(addStar);

//adicionando imagem de fundo na cena
const spaceTexture = new THREE.TextureLoader().load('/dark-sky.jpg');
scene.background = spaceTexture;

const texture = new THREE.TextureLoader().load('/texture.jpg');
const moonTexture = new THREE.TextureLoader().load('/moon.jpg');
//cria uma esfera e bota uma imagem embrulhando ela
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(6, 66, 66),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: texture
    })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

//função pra mudar a posição dos objetos em cena quando da scroll na tela
function moveCamera() {
 const t = document.body.getBoundingClientRect().top;
 
 moon.rotation.x += 0.05;
 moon.rotation.y += 0.075;
 moon.rotation.z += 0.05;

 camera.position.z = t * -0.01;
 camera.position.x = t * -0.02;
 camera.rotation.y = t * -0.02;
}

document.body.onscroll = moveCamera;

//função pra rodar em loop a animação
function animate() {
requestAnimationFrame(animate);

// torus.rotation.x += 0.01;
// torus.rotation.y += 0.005;
// torus.rotation.z += 0.01;

controls.update();

renderer.render(scene, camera);
}

animate();