// 模型：包含网格，材质，贴图等信息的集合物体
// 模型文件：分为 .gltf, .glb, .fbx 等等类型
// 使用：借助 three.js 提供的 GLTFLoader 加载器可以加载 .gltf / .glb 模型文件，得到模型对象

import "./style.css";

// 引入场景的全局变量
import { scene } from "./utils/init.js";
import * as dat from "dat.gui";

// 引入模型加载器
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 引入threeJS
import * as THREE from "three";

// 初始化物体方法
function initBase() {
  // 初始化模型加载器
  const gltfLoader = new GLTFLoader();
  // 加载模型
  gltfLoader.load("model/ferrari.glb", (glb) => {
    // console.log("glb", glb)
    // 取出模型对象
    const model = glb.scene;

    //遍历物体内部每个小物体组成
    model.traverse((obj) => {
      if (obj.name === "Object_3") {
        console.log("obj", obj);
        obj.material.color = new THREE.Color(0xff6600);
      }
    });

    // 将模型对象添加到场景
    scene.add(model);
  });
}

// 创建光照
function createLight() {
  // 环境光：无方向，照亮场景中所有受光照影响的物体
  const light = new THREE.AmbientLight(0x404040); // 柔和的白光
  scene.add(light);

  // 平行光：从一个方向发射过来平行光线
  const direction = new THREE.DirectionalLight(0xffffff, 10);
  direction.position.set(3, 3, 3);
  scene.add(direction);

  // 平行光辅助对象
  // 参数1：平行光对象，参数2：模拟平行光光源的大小
  const helper = new THREE.DirectionalLightHelper(direction, 1);
  scene.add(helper);
}

// 调用初始化物体方法
initBase();

// 调用创建光照方法
createLight();
