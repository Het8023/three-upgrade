// 目标: 使用透明度贴图，控制物体某一部分透明，而不是全部透明
// 设置：材质的 [alphaMap](https://threejs.org/docs/index.html) 属性，值为纹理对象
// 原理：
// 贴图黑色部分：完全透明
// 贴图白色部分：完全不透明
// 注意：透明度需要材质开启 transparent 属性

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

  // 1. 加载具有透明度的贴图
  const alphaTexture = textureLoader.load("texture/one/opacity.jpg");
  alphaTexture.colorSpace = THREE.SRGBColorSpace;

  // 创建图形
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    alphaMap: alphaTexture,
    transparent: true,
    // opacity: 0.3
  });
  // 创建物体
  const sphere = new THREE.Mesh(geometry, material);
  // 添加到场景
  scene.add(sphere);
}

// 调用初始化物体方法
initBase();
