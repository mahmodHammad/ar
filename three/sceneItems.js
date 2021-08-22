import * as THREE from "./modules/three.module.js";
import { scene } from "./setup.js";
import { loadModel } from "./ModelLoader.js";
import {makeTextSprite} from "./drawText.js"
// import {setHDRLighting} from "./panorama.js"

import { Line2 } from './modules/Line2.js';
import { LineMaterial } from './modules/LineMaterial.js';
import { LineGeometry } from './modules/LineGeometry.js';


const  wheel = "three/models/table.glb"
let model= undefined

function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 0.2);
  let lightBack = new THREE.SpotLight(0xff9900, 0.2);
  let lightFront = new THREE.SpotLight(0x00ffff, 0.2);
  let PointLight = new THREE.PointLight(0xffffff, 0.2);
  lightBack.position.set(2, 50, -7);
  lightFront.position.set(-2, -30, 7);
  PointLight.position.set(10, 0, 20);

  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);
  scene.add(PointLight)
}

function AddLine(start, end, colored) {

 const color  =new THREE.Color(colored)
  const positions = [start.x,start.y,start.z , end.x,end.y,end.z];
  const colors = [];


  // positions.push(0, 0,  0 );
  // positions.push( 2, 2,2 );

colors.push( color.r, color.g, color.b );
colors.push( color.r, color.g, color.b );

  // Line2 ( LineGeometry, LineMaterial )

  const geometry = new LineGeometry();
  geometry.setPositions( positions );
  geometry.setColors( colors );

  const matLine = new LineMaterial( {

    color: 0xffffff,
    linewidth: 0.1, // in pixels
    vertexColors: true,
    resolution: new THREE.Vector2(window.innerWidth/10, window.innerHeight/10),
    dashed: false,
    alphaToCoverage: false,

  } );

  const line = new Line2( geometry, matLine );
  line.computeLineDistances();
  // line.scale.set( 0.01, 0.01, 0.01 );
  scene.add( line );

  return  line
}

function addAnnotation(targets, name){
 let test = [
   {start:[0,0,0],end:[1,1.1,1.2],color:"#f94",name:"Table"},
   {start:[-1.03,0.0,0],end:[-1.2,1.5,1],color:"#f94",name:"Chair"},
]
 test.forEach(target => {
    let { start, end,color,name } =target
    start = new THREE.Vector3().fromArray(start)
    end = new THREE.Vector3().fromArray(end)
    let line = AddLine(
      end,
      start,
      color,
    );

    let lable = addLable(end,target);
    var annotation = new THREE.Group();
    annotation.name = name;

    annotation.add(lable);
    annotation.add(line);

    // labelsGroup.add(renderTextLabel);
  //   // renderedItem.label = renderTextLabel;
  //   indexGroupParent.add(indexGroup);
  //   labelsGroup.add(indexGroupParent);
  scene.add(annotation)
  });
  // return "hi";
}


function addLable({x,y,z},target){
  var text2d = makeTextSprite(
    target.name,
    target.color,
    "#333a",
    [12, 4],
    "bold",
    1.5,
    target.color,
    "target",
     5
  );
  text2d.position.set(x , y+0.06 , z)
  return text2d
}

// Any thing will be added to scene should be done here
const addToScene = () => {
  addLights();
  addAnnotation()
  // setHDRLighting()
  const gm = new THREE.BoxGeometry(1,1,1)
  const mat = new THREE.MeshStandardMaterial()
  const mesh = new THREE.Mesh(gm,mat)
  mesh.position.set(-1,-1,-1)
  scene.add(mesh)
// 166106217
  const mesh2 = new THREE.Mesh(gm,mat)
  mesh2.position.set(1,1,3)
  scene.add(mesh2)
  
  const mesh3 = new THREE.Mesh(gm,mat)
  mesh3.position.set(0,0,1)
  scene.add(mesh3)
  

  loadModel(wheel).then(glb=>{
    model = glb
    console.log(model)
    model.position.set(0, -0.5, 0)
    model.scale.set(0.0007,0.0007,0.0007)
    scene.add(model)
  }
  )
};

export { addToScene,model };