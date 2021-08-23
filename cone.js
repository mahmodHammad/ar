import * as THREE from "./three/modules/three.module.js";
import { ARButton } from "./three/modules/ARButton.js";
import { loadModel } from "./three/ModelLoader.js";
const wheel = "./three/models/compressedTable.glb";
import {addAnnotation, addLable} from "./cone/sceneItems.js"
let camera, scene, renderer, model;

let controller;

init();
animate();

function addLights() {
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);
}

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );
  addLights();
  addTestingMeshed();

  //

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  //

  document.body.appendChild(ARButton.createButton(renderer));

  //
  
  loadModel(wheel).then((glb) => {
    model = glb;
    glb.position.set(0, 0, -3);
    glb.scale.set(0.1, 0.1, 0.1);
    scene.add(glb);
  });


  const geometry = new THREE.CylinderGeometry(0, 0.05, 0.2, 32).rotateX(
    Math.PI / 2
  );

  function onSelect() {
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff * Math.random(),
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -0.3).applyMatrix4(controller.matrixWorld);
    mesh.quaternion.setFromRotationMatrix(controller.matrixWorld);
    scene.add(mesh);
  }

  controller = renderer.xr.getController(0);
  controller.addEventListener("select", onSelect);
  scene.add(controller);

  //

  window.addEventListener("resize", onWindowResize);
  const lol = addAnnotation()
  console.log(lol)
  scene.add(lol)
  let lable = addLable([0,1.1,1.2],{start:[0,0,0],end:[0,1.1,1.2],color:"#f94",name:"Table"});
  scene.add(lable)


}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {
  if (model) {
    model.rotateY(0.01);
    model.rotateZ(0.005);
  }
  renderer.render(scene, camera);
}

function addTestingMeshed() {
  const gm = new THREE.BoxGeometry(1, 0.1, 0.1);
  const mat = new THREE.MeshStandardMaterial();
  const mesh = new THREE.Mesh(gm, mat);
  mesh.position.set(0, -0.5, -1);
  scene.add(mesh);
  // 166106217
  const mesh2 = new THREE.Mesh(gm, mat);
  mesh2.position.set(0, 1, 3);
  //   scene.add(mesh2)

  const mesh3 = new THREE.Mesh(gm, mat);
  mesh3.position.set(0, 0, 0);
  //   scene.add(mesh3)
}


export{camera, scene, renderer, model}