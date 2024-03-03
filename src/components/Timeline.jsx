import React, { useState, useRef, useMemo, useEffect } from "react";
import WaveSurfer from "@wavesurfer/react";
import AudioPlayer from "react-audio-player";
import LineDraggable from "react-draggable";
import { FaPause, FaStepForward } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import audio1 from "../assets/audios/audio1.mp3";
import audio2 from "../assets/audios/audio2.mp3";
import audio3 from "../assets/audios/audio3.mp3";
import {
  Controls,
  TimelineContainer,
  WaveForms,
} from "../styles/TimelineStyles";
/**
 * @author
 * @function Timeline
 **/

export const Timeline = (props) => {
  const SONG_WIDTH = 1500;
  const audioRef = useRef();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const timelineDraggableRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFiles, setAudioFiles] = useState([
    {
      url: audio1,
      duration: 267.75,
    },
    {
      url: audio2,
      duration: 248.3,
    },
    {
      url: audio3,
      duration: 118.5,
    },
  ]);
  useEffect(() => {
    if (audioRef?.current?.audioEl?.current) {
      try {
        isPlaying
          ? audioRef?.current?.audioEl?.current?.play()
          : audioRef?.current?.audioEl?.current?.pause();
      } catch (e) {
        console.log(e);
      }
    }
  }, [isPlaying, currentSongIndex]);
  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };
  useEffect(() => {
    const songDuration = audioRef?.current?.audioEl.current?.duration;
    const newPos =
      SONG_WIDTH * currentSongIndex +
      currentSongIndex * 10 +
      (SONG_WIDTH / songDuration) * currentTime;
    timelineDraggableRef?.current?.setState({ x: newPos, y: 0 });
  }, [currentTime, timelineDraggableRef]);
  const handleDrag = (e, data) => {
    const { x } = data;
    let newSongIndex =
      Math.floor((x / (audioFiles.length * SONG_WIDTH)) * audioFiles.length) %
      audioFiles.length;
    let newCurrentTime =
      (audioFiles[newSongIndex].duration * (x % SONG_WIDTH)) / SONG_WIDTH;
    audioRef.current.audioEl.current.currentTime = newCurrentTime;
    if (newSongIndex < 0) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(newSongIndex);
    }
  };
  useEffect(() => {
    console.log(timelineDraggableRef?.current);
  }, [timelineDraggableRef]);
  const timelines = useMemo(() => {
    return audioFiles.map((audio, index) => {
      return (
        <WaveSurfer
          key={index}
          url={audio.url}
          waveColor="rgb(200, 0, 200)"
          width={SONG_WIDTH}
          index={index}
          interact={false}
        />
      );
    });
  }, [JSON.stringify(audioFiles)]);
  const handlePrevious = () => {
    let index = currentSongIndex > 0 ? currentSongIndex - 1 : 0;
    audioRef.current.audioEl.current.currentTime = 0;
    setCurrentSongIndex(index % audioFiles.length);
    setIsPlaying(true);
  };
  const handleNext = () => {
    let index =
      currentSongIndex < audioFiles.length
        ? currentSongIndex + 1
        : audioFiles.length;
    console.log("Index changed", index);
    audioRef.current.audioEl.current.currentTime = 0;
    setCurrentSongIndex(index % audioFiles.length);
    setIsPlaying(true);
  };
  const handlePlayPause = () => {
    console.log(audioRef);
    setIsPlaying(!isPlaying);
  };
  return (
    <TimelineContainer>
      <h3>Timeline</h3>
      <Controls>
        <FaStepBackward size={25} onClick={handlePrevious} />
        {isPlaying ? (
          <FaPause size={25} onClick={handlePlayPause} />
        ) : (
          <FaPlay size={25} onClick={handlePlayPause} />
        )}
        <FaStepForward size={25} onClick={handleNext} key={"forward"} />
      </Controls>
      <WaveForms>
        <LineDraggable
          axis="x"
          onDrag={handleDrag}
          ref={timelineDraggableRef}
          defaultPosition={{ x: 0, y: 0 }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              width: "4px",
              height: "100%",
              background: "red",
              zIndex: 1000,
              transform: "translateX(-50%)",
            }}
          />
        </LineDraggable>
        {timelines}
      </WaveForms>

      <AudioPlayer
        ref={audioRef}
        src={audioFiles[currentSongIndex | 0].url}
        listenInterval={1000}
        onListen={handleTimeUpdate}
        onEnded={() => handleNext}
        // autoPlay
      />
    </TimelineContainer>
  );
};
