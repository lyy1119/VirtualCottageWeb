import Sider from "antd/es/layout/Sider";
import AudioPlayer from "./component/AudioPlayer/AudioPlayer";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";


// 根据时间计算 HSL 值，返回背景色
function getBackgroundColorByTime(hour) {
  // 将时间映射到 HSL 的 hue 色相（从210到40度之间）
  // 0点：深蓝紫（260），6点：日出橙（30），12点：天蓝（200），18点：黄昏（40）
  let hue;
  if (hour >= 6 && hour < 12) {
    // 清晨到中午：橙色(30) → 蓝色(200)
    hue = 30 + ((hour - 6) / 6) * (200 - 30);
  } else if (hour >= 12 && hour < 18) {
    // 中午到傍晚：蓝色(200) → 黄昏金色(40)
    hue = 200 - ((hour - 12) / 6) * (200 - 40);
  } else if (hour >= 18 && hour < 24) {
    // 傍晚到夜晚：金色(40) → 深蓝紫(260)
    hue = 40 + ((hour - 18) / 6) * (260 - 40);
  } else {
    // 夜晚到清晨：深蓝紫(260) → 橙色(30)
    hue = 260 - ((hour < 6 ? hour : 0) / 6) * (260 - 30);
  }
  console.log(hour);
  return `hsl(${hue}, 70%, 60%)`; // 控制饱和度和亮度
}

export default function App() {
  const [bgColor, setBgColor] = useState(getBackgroundColorByTime(new Date().getHours()));

  useEffect(() => {
    const updateBackground = () => {
      const hour = new Date().getHours();
      setBgColor(getBackgroundColorByTime(hour));
    };

    updateBackground(); // 初始化时设置
    const timer = setInterval(updateBackground, 60 * 1000); // 每分钟更新

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: bgColor,
        transition: "background-color 1s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        color: "#fff",
      }}
    >
      <AudioPlayer></AudioPlayer>
    </div>
  );
}
