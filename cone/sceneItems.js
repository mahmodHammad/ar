import * as THREE from "../three/modules/three.module.js";
import { scene } from "../cone.js";

import { loadModel } from "./ModelLoader.js";
import {makeTextSprite} from "./drawText.js"
import {setHDRLighting} from "./panorama.js"

import { Line2 } from '../three/modules/Line2.js';
import { LineMaterial } from '../three/modules/LineMaterial.js';
import { LineGeometry } from '../three/modules/LineGeometry.js';


const  wheel = "three/models/compressedTable.glb"
let model= undefined



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
    linewidth: 0.18, // in pixels
    vertexColors: true,
    resolution: new THREE.Vector2(window.innerWidth/10, window.innerHeight/10),
    dashed: false,
    alphaToCoverage: false,

  } );

  const line = new Line2( geometry, matLine );
  line.computeLineDistances();
  // line.scale.set( 0.01, 0.01, 0.01 );


  return  line
}

function addAnnotation(targets, name){
 let test = [
   {start:[0,0,0],end:[0,1.1,1.2],color:"#f94",name:"Table"},
   {start:[0,0.0,0],end:[-1.2,1.5,1],color:"#f94",name:"Chair"},
]
var all = new THREE.Group();
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
  all.add(annotation)
  });

  const gm = new THREE.BoxGeometry(1, 0.1, 0.1);
  const mat = new THREE.MeshStandardMaterial();
  const mesh = new THREE.Mesh(gm, mat);
  mesh.position.set(0, -0.5, -1);
  // scene.add(mesh);
  // 166106217
  const mesh2 = new THREE.Mesh(gm, mat);
  mesh2.position.set(0, 1, 3);
  //   scene.add(mesh2)

  const mesh3 = new THREE.Mesh(gm, mat);
  mesh3.position.set(0, 0, 0);
  // return "hi";
  return mesh
}

function displayCoards(  gridSize =100,gridDivisions =100) {
  scene.add(new THREE.AxesHelper(20));
  scene.add(new THREE.GridHelper(gridSize, gridDivisions, "green", "green"));
  scene.add(
    new THREE.GridHelper(gridSize, gridDivisions, "blue", "blue").rotateX(
      Math.PI / 2
    )
  );
  scene.add(
    new THREE.GridHelper(gridSize, gridDivisions, "red", "red").rotateZ(
      Math.PI / 2
    )
  );
}

function addLable({x,y,z},target){
  displayCoards()
  var text2d = makeTextSprite(
    target.name,
    target.color,
    "#333a",
    [12, 4],
    "bold",
    1.5,
    target.color,
    "target",
     500
  );
  text2d.position.set(x , y+0.11 , -1)
  return text2d
}

// Any thing will be added to scene should be done here


export {addAnnotation ,addLable };