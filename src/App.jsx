import Sider from "antd/es/layout/Sider";
import AudioPlayer from "./component/AudioPlayer/AudioPlayer";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function App(){
  return(
    <div>
      <h1>Vritual Cottage By React</h1>
      <AudioPlayer/>
    </div>
      
  );
}