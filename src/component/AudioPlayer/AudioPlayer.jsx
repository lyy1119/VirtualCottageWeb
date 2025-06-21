// src/components/AudioPlayer/AudioPlayer.jsx
import React, { useRef, useState } from "react";
import { Button, Flex, Slider } from "antd";
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';
import useAudioList from "./UseAudioList";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [audioNow, setAudioNow] = useState('audio/Joe Bizzaro - wish on a star.ogg')

    const handleClickPlay = () => {
        const audio = audioRef.current;
        setIsPlaying(prev => {
            const next = !prev;
            if (next) {
            audio.play().catch(e => console.error('播放失败：', e));
            } else {
            audio.pause();
            }
            return next;
        });
    };

    const [volume, setVolume] = useState(100);

    function handleChangeVolume(value){
        setVolume(value);
        const audio = audioRef.current;
        audio.volume = value / 100;
    }

    const audioList = useAudioList();

    return(
        <div>
            <audio ref={audioRef} src={audioNow} preload="auto" />
            <Flex gap="middle" vertical={false}>
                <Button ghost onClick={handleClickPlay}  icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />} />
                <Button ghost icon={<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-shuffle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 4l3 3l-3 3" /><path d="M18 20l3 -3l-3 -3" /><path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" /><path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" /></svg>}></Button>
            </Flex>
            <Slider defaultValue={volume} onChange={handleChangeVolume}/>
            <ul>
                {audioList.map((audio, index) => (
                    <li key={index}>{audio.name} :{audio.src}</li>
                ))}
            </ul>
        </div>
    );
}
