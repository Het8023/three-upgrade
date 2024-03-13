// 目标: 了解什么是颜色贴图以及如何使用
// 设置：材质的 [map](https://threejs.org/docs/index.html) 属性，值为纹理对象
// 1.创建几何图形
// 2.定义纹理对象
// 3.创建材质对象
// 4.创建物体，加入场景中

import "./style.css";

// 引入场景的全局变量
import { scene } from "./utils/init.js";

// 引入threeJS
import * as THREE from "three";

// 初始化物体方法
function initBase() {
  // 创建纹理加载器
  const textureLoader = new THREE.TextureLoader();
  // 加载图片资源
  const texture = textureLoader.load("texture/one/basecolor.jpg");
  // 设置贴图的颜色通道为 rgb
  texture.colorSpace = THREE.SRGBColorSpace;

  // 创建图形
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  // 创建物体
  const sphere = new THREE.Mesh(geometry, material);
  // 添加到场景
  scene.add(sphere);
}

// 调用初始化物体方法
initBase();
