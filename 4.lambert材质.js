// 目标：Lambert 网格材质
// 作用：一种非光泽表面的材质（漫反射），没有镜面高光（受光照影响）
// 使用：
// 1. 替换网格材质的构造函数为 MeshLambertMaterial
// 2. 设置平行光 DirectionalLight 照亮物体
// 注意：ao 环境遮挡贴图只对"环境光"做计算

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
  // 创建材质(Lambert 网格材质)
  const material = new THREE.MeshLambertMaterial({
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

// 创建光照
function createLight() {
  // 环境光：无方向，照亮场景中所有受光照影响的物体
  const light = new THREE.AmbientLight(0x404040); // 柔和的白光
  scene.add(light);

  // 平行光：从一个方向发射过来平行光线
  const direction = new THREE.DirectionalLight(0xffffff, 2);
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
