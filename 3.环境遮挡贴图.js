// 目标：基础网格材质-环境遮挡贴图
// 作用：让物体有亮暗的对比，更真实
// 原理：黑色部分挡住光线（更暗），白色部分（更亮）
// 步骤：
// 1. 创建纹理对象，加载贴图
// 2. 赋予给材质 aoMap 属性

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

  // 1. 加载环境遮挡贴图
  const aoTexture = textureLoader.load("texture/one/ambientOcclusion.jpg");
  aoTexture.colorSpace = THREE.SRGBColorSpace;

  // 创建图形
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    // 透明图贴图
    // alphaMap: alphaTexture,
    // 开启透明度
    // transparent: true,
    // 整个材质透明
    // opacity: 0.3
    // 设置环境遮挡贴图
    aoMap: aoTexture,
  });

  // 创建物体
  const sphere = new THREE.Mesh(geometry, material);
  // 扩展：给目标物体设置第二组 UV 坐标（影响贴图像素点转换对应映射过程）
  // 当 aoMap 直接无效果的时候，设置第二组 UV 坐标来影响贴图贴过来时的明暗效果
  sphere.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
  );
  // 添加到场景
  scene.add(sphere);
}

// 调用初始化物体方法
initBase();
