import './App.css';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Grid, Html, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

import worldGLTF from './assets/models/background.glb';
import hiddingFrameGLTF from './assets/models/hiddingFrame.glb';
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

import mobileScreenTexture from './assets/textures/screen/mobile.jpg'

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
  // console.log(nodes)

  const Meshes = () => {
    let MeshArr= []
    var prop;
    for(prop in nodes){
      // console.log(prop)
      if(prop!='Scene'){
        MeshArr.push(
          <mesh geometry={nodes[prop].geometry}>
            <meshStandardMaterial map={modelTexture}/>
          </mesh>
        )
      }
      }
      return MeshArr
  }
      
  return(
    <>
      <Meshes/>
    </>
  )
}

function LoadHidden(){
  const hidden = useGLTF(hiddingFrameGLTF)

  return(
    <>
      <primitive object={hidden.scene}/>
    </>
  )  
}

function LoadWorld(){
  const {nodes} = useGLTF(worldGLTF)

  console.log(nodes)

  return(
    <group>

      <mesh geometry={nodes.Cube003.geometry}>
        <meshBasicMaterial color="#07052A"/>
      </mesh>
      <mesh geometry={nodes.Sphere.geometry}>
        <meshBasicMaterial color="#ADD8E6"/>
      </mesh>
      <mesh geometry={nodes.Sphere001.geometry}>
        <meshBasicMaterial color="#FC9601"/>
      </mesh>
      <mesh geometry={nodes.Sphere002.geometry}>
        <meshBasicMaterial color="#3342BF"/>
      </mesh>
      <mesh geometry={nodes.Sphere003.geometry}>
        <meshBasicMaterial color="red"/>
      </mesh>
      <mesh geometry={nodes.Sphere005.geometry}>
        <meshBasicMaterial color="white"/>
      </mesh>
      <mesh geometry={nodes.Sphere006.geometry}>
        <meshBasicMaterial color="red"/>
      </mesh>
    </group>
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
        <meshStandardMaterial color="red"/>
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
    <Canvas style={canvasStyle} camera={{fov:80, near:0.1, far:10000, position:[5,7,5]}}>
      <EffectComposer>
        {/*<DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />*/}
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

      <OrbitControls
        minAzimuthAngle={Math.PI - Math.PI / 1.15}
        maxAzimuthAngle={Math.PI - Math.PI /1.7}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}	
      	maxDistance={10}
	    />
      <Grid/>
      <gridHelper/>
      {modelsData.map(item=>(
        <LoadModels model={item.model} texture={item.texture}/>
        ))}
      <LoadScreens/>
      <LoadHidden/>
      <LoadWorld/>
      {/* <pointLight position={[0, 20, 10]} intensity={1.5} /> */}
      <ambientLight intensity={4}/>
      
    </Canvas>
  );
}

export default App;
