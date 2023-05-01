import './App.css';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Grid, Html, OrbitControls, useGLTF, useTexture } from '@react-three/drei';

import laptopGLTF from './assets/models/laptop.glb';
import laptopTexture from './assets/textures/laptop.png';
import buildingGLTF  from './assets/models/building.glb';
import buildingTexture from './assets/textures/building.png';
import workspaceGLTF  from './assets/models/workspace.glb';
import workspaceTexture from './assets/textures/workspace.png';
import sittingGLTF  from './assets/models/sitting.glb';
import sittingTexture from './assets/textures/sitting.png';
import bedroomGLTF  from './assets/models/bedroom.glb';
import bedroomTexture from './assets/textures/bedroom.png';

import screens from './assets/models/screens.glb'

const modelsData = [
  {model:laptopGLTF, texture:laptopTexture},
  {model:buildingGLTF, texture:buildingTexture},
  {model:workspaceGLTF, texture:workspaceTexture},
  {model:sittingGLTF, texture:sittingTexture},
  {model:bedroomGLTF, texture:bedroomTexture},
]

function LoadModels({model,texture}){
  const {nodes} = useGLTF(model)

  // The Drei texture loader documentation is not comprehensive enough, lets use three.js
  // const laptopSkin = useTexture(LaptopTexture)

  var modelTexture = new THREE.TextureLoader().load(texture)
  modelTexture.flipY = false

  return(
    <mesh geometry={nodes.Mesh.geometry}>
      <meshBasicMaterial map={modelTexture} attach="material"/>
    </mesh>
  )
}

function LoadScreens (){
  const {nodes} = useGLTF(screens)

  console.log(nodes)
  
  return(
    <group>
      <mesh geometry={nodes.Plane005.geometry}>
        <meshBasicMaterial color="red"/>
      </mesh>
      <mesh geometry={nodes.Cube005.geometry}>
        <meshBasicMaterial color="red"/>
      </mesh>
      <mesh geometry={nodes.Cube014.geometry}>
        <meshBasicMaterial color="red"/>
      </mesh>
      <mesh geometry={nodes.Plane007.geometry}>
        <meshBasicMaterial color="red"/>
      </mesh>
      <mesh geometry={nodes.Cylinder006.geometry}>
        <meshBasicMaterial color="red"/>
      </mesh>
    </group>
    
  )
}

const canvasStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh'
}

function App() {
  return (
    <Canvas style={canvasStyle} camera={{fov:80}}>
      <OrbitControls/>
      <Grid/>
      <gridHelper/>
      {modelsData.map(item=>(
        <LoadModels model={item.model} texture={item.texture}/>
      ))}
      <LoadScreens/>
    </Canvas>
  );
}

export default App;
