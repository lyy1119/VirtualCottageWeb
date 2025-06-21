import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, Slider } from "antd";
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';
import useAudioList from "./UseAudioList";
import './AudioPlayer.css';

export default function AudioPlayer() {
    const audioList = useAudioList();
    const [audioNow, setAudioNow] = useState(null); // 初始为 null 更清晰
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const audioRef = useRef(null);

    // 当 audioNow 或 isPlaying 状态变化时，处理播放
    useEffect(() => {
        const audio = audioRef.current;
        if (audioNow && isPlaying) {
            audio.play().catch(e => console.error('播放失败：', e));
        }
        else if (isPlaying === false){
            audio.pause();
        }
    }, [audioNow, isPlaying]);

    const handleClickPlay = () => {
        if (!audioNow) {
            // 若当前没有音频，随机选一个
            const randIndex = Math.floor(Math.random() * audioList.length);
            setAudioNow(audioList[randIndex]);
        } 
        setIsPlaying(prev => !prev);
    };

    const handleChangeVolume = (value) => {
        setVolume(value);
        const audio = audioRef.current;
        if (audio) {
            audio.volume = value / 100;
        }
    };

    function handleRandomAudio(){
        const randIndex = Math.floor(Math.random() * audioList.length);
        if (!audioNow) {
            // 若当前没有音频，随机选一个
            setAudioNow(audioList[randIndex]);
            return ;
        }
        const currentSrc = audioNow.src;
        while (currentSrc === audioList[randIndex].src && audioList.length != 1){
            const randIndex = Math.floor(Math.random() * audioList.length); // 直到选出一个不同的
        }
        setAudioNow(audioList[randIndex]);
    }

    function next_audio(){
        const currentSrc = audioNow.src;
        let randIndex = 0;
        do{
            randIndex = Math.floor(Math.random() * audioList.length); // 直到选出一个不同的
        }while(currentSrc === audioList[randIndex].src && audioList.length != 1);

        setAudioNow(audioList[randIndex]);
    }

    return (
        <div className="AudioPlayer">
            <div className="interact-button">
                <div className="play-pause-button">
                    <Flex gap="middle" vertical={false}>
                        <Button ghost onClick={handleClickPlay} icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />} />
                        <Button onClick={handleRandomAudio}
                            ghost icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="icon icon-tabler icon-tabler-arrows-shuffle">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M18 4l3 3l-3 3" />
                                <path d="M18 20l3 -3l-3 -3" />
                                <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
                                <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" />
                            </svg>
                        } />
                    </Flex>
                </div>
                <div className="volume-slider">
                    <Slider defaultValue={volume} onChange={handleChangeVolume} />
                </div>
            </div>
            <audio ref={audioRef} src={audioNow?.src} preload="auto" onEnded={next_audio}/>
            <div className="audio-name">
                {audioNow?.name || "None"}
            </div>
        </div>
    );
}
