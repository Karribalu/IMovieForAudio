import React, { useState, useRef, useMemo, useEffect } from "react";
import WaveSurfer from "@wavesurfer/react";
import AudioPlayer from "react-audio-player";
import Draggable from "react-draggable";
import audio1 from "../assets/audios/audio1.mp3";
import audio2 from "../assets/audios/audio2.mp3";
import audio3 from "../assets/audios/audio3.mp3";
import styles from "../styles/Timeline.module.css";
import { FaStepForward } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import WaveTimeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

/**
 * @author
 * @function Timeline
 **/

export const Timeline = (props) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  //   const [audioFiles, setAudioFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([
    {
      url: audio1,
    },
    {
      url: audio2,
    },
    {
      url: audio3,
    },
  ]);
  const audioRef = useRef();
  useEffect(() => {
    console.log("current time changes", currentTime);
    console.log(
      (currentTime / audioRef.current.audioEl.current.duration) * 100
    );
  }, [currentTime]);
  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };
  const handleSongChange = (index) => {
    console.log("song change", index);
    setCurrentSongIndex(index);
    audioRef.current.audioEl.current.currentTime = 0;
  };
  const handleDrag = (e, data) => {
    console.log("drag", e, data);
    // const { x } = data;
    // const timelineWidth = e.target.offsetWidth;
    // const songDuration = audioFiles[currentSongIndex].duration;
    // const newTime = (x / timelineWidth) * songDuration;
    // setCurrentTime(newTime);
    // audioRef.current.audioEl.current.currentTime = newTime;
  };
  const handleInteraction = (e, data) => {
    audioRef.current.audioEl.current.play();
    setCurrentSongIndex(e.options.index);
    console.log("interaction", e, data);
  };
  let timelinePos = useMemo(() => {
    return (
      ((currentTime / audioRef?.current?.audioEl?.current?.duration) | 1) * 100
    );
  }, [currentTime, audioRef?.current?.audioEl?.current?.duration]);
  const waveTimeline = useMemo(() => [WaveTimeline.create()], []);
  return (
    <div className={styles.container}>
      <h3>Timeline</h3>
      <div className={styles.controls}>
        <FaStepForward size={25} />
        <FaPlay size={25} />
        <FaStepBackward size={25} />
      </div>
      <div className={styles.waveForms}>
        <Draggable axis="x" onDrag={handleDrag}>
          <div
            style={{
              position: "absolute",
              left: `${timelinePos}%`,
              top: "0",
              //   left: "50px",
              width: "2px",
              height: "100%",
              background: "red",
              zIndex: 1000,
              transform: "translateX(-50%)",
            }}
          />
        </Draggable>
        {audioFiles.map((audio, index) => (
          <div className={styles.waveForm}>
            <WaveSurfer
              key={index}
              url={audio.url}
              waveColor="rgb(200, 0, 200)"
              progressColor="rgb(100, 0, 100)"
              width={1500}
              onFinish={handleSongChange}
              //   onDrag={handleDrag}
              onInteraction={handleInteraction}
              onSeeking={handleDrag}
              finish={handleSongChange}
              index={index}
              //   plugins={waveTimeline}
            />
          </div>
        ))}
      </div>
      <AudioPlayer
        ref={audioRef}
        src={audioFiles[currentSongIndex].url}
        listenInterval={2}
        onListen={handleTimeUpdate}
        onEnded={() =>
          handleSongChange((currentSongIndex + 1) % audioFiles.length)
        }
        autoPlay
      />
    </div>
  );
};
