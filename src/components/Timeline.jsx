import React, { useState, useRef, useMemo, useEffect } from "react";
import WaveSurfer from "@wavesurfer/react";
import AudioPlayer from "react-audio-player";
import LineDraggable from "react-draggable";
import { FaPause, FaStepForward } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Controls,
  EmptyTimeline,
  PlayBackControls,
  PlayBackTime,
  PlaybackContainer,
  TimelineContainer,
  TimelineHeader,
  WaveForm,
  WaveForms,
} from "../styles/TimelineStyles";
import { getMinutes, getSeconds } from "../utils";

export const Timeline = (props) => {
  const { audios, order } = props;
  const SONG_WIDTH = 1200;
  const audioRef = useRef();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const timelineDraggableRef = useRef();
  const scrollableDivRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mouseCoordinates, setMouseCoordinates] = useState(0);
  const [draggableLinePosition, setDraggableLinePosition] = useState(10);
  const [totalRuntime, setTotalRuntime] = useState("00:00");
  const [currentRuntime, setCurrentRuntime] = useState("00:00");
  useEffect(() => {
    if (order.length > 0) {
      let totalRuntime = 0;

      order.map((audio) => {
        totalRuntime += audios[audio].duration;
      });
      setTotalRuntime(
        getMinutes(totalRuntime) + ":" + getSeconds(totalRuntime)
      );
    }
  }, [audios]);
  useEffect(() => {
    timelineDraggableRef?.current?.setState({
      x: draggableLinePosition,
      y: 0,
    });
  }, [draggableLinePosition, timelineDraggableRef]);
  useEffect(() => {
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current.audioEl.current.currentTime = currentTime;
    }, [100]);
  }, [currentSongIndex]);
  useEffect(() => {
    if (audioRef?.current?.audioEl?.current) {
      const promise = audioRef?.current?.audioEl?.current?.play();
      if (promise !== undefined) {
        promise.catch(console.debug);
        if (!isPlaying) {
          audioRef?.current?.audioEl?.current?.pause();
        }
      }
    }
  }, [isPlaying]);
  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };
  useEffect(() => {
    const songDuration = audioRef?.current?.audioEl.current?.duration;
    const newPos =
      10 +
      SONG_WIDTH * currentSongIndex +
      currentSongIndex * 20 +
      (SONG_WIDTH / songDuration) * currentTime;
    setCurrentRuntime(calculateCurrentRuntime(currentTime, currentSongIndex));
    setDraggableLinePosition(newPos);
  }, [currentTime]);
  const handleDrag = (_, data) => {
    try {
      const { x } = data;
      let newSongIndex =
        Math.floor(
          (x / (order.length * SONG_WIDTH + order.length * 20)) * order.length
        ) % order.length;
      let newCurrentTime =
        (audios[order[newSongIndex]].duration * (x % SONG_WIDTH)) / SONG_WIDTH;
      audioRef.current.audioEl.current.currentTime = newCurrentTime;
      if (newSongIndex !== currentSongIndex) {
        setCurrentTime(newCurrentTime);
      }
      if (newSongIndex < 0) {
        setCurrentSongIndex(0);
      } else {
        setCurrentSongIndex(newSongIndex);
      }
    } catch (e) {}
  };
  const calculateCurrentRuntime = (time, songIndex) => {
    let totalTime = time;
    for (let i = 0; i < songIndex; i++) {
      totalTime += audios[order[i]].duration;
    }
    return getMinutes(totalTime) + ":" + getSeconds(totalTime);
  };
  const timelines = useMemo(() => {
    return order.map((audio, index) => {
      return (
        <Draggable draggableId={audio} index={index} key={audio}>
          {(provided) => (
            <div>
              <WaveForm
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                key={index}
              >
                <p
                  style={{
                    paddingLeft: "50%",
                  }}
                >
                  {audios[audio].name}
                </p>
                <WaveSurfer
                  key={index}
                  url={audios[audio].url}
                  waveColor="rgb(200, 0, 200)"
                  width={SONG_WIDTH}
                  index={index}
                  height={200}
                  interact={false}
                />
              </WaveForm>
            </div>
          )}
        </Draggable>
      );
    });
  }, [JSON.stringify(order)]);
  const handlePrevious = () => {
    let index = currentSongIndex > 0 ? currentSongIndex - 1 : 0;
    setCurrentTime(0);
    setCurrentSongIndex(index % order.length);
    setIsPlaying(true);
  };
  const handleNext = () => {
    let index =
      currentSongIndex < order.length ? currentSongIndex + 1 : order.length;
    setCurrentTime(0);
    setCurrentSongIndex(index % order.length);
    setIsPlaying(true);
  };
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handlMouseMove = (event) => {
    const rect = scrollableDivRef.current.getBoundingClientRect();
    const offsetX =
      event.clientX - rect.left + scrollableDivRef.current.scrollLeft;
    setMouseCoordinates(offsetX);
  };
  const handleTimelineClick = () => {
    handleDrag("", { x: mouseCoordinates });
    setDraggableLinePosition(mouseCoordinates);
  };
  return (
    <PlaybackContainer>
      <h3>Timeline</h3>
      <Controls>
        <PlayBackTime>
          <span>{currentRuntime + " / " + totalRuntime}</span>
        </PlayBackTime>
        <PlayBackControls>
          <FaStepBackward
            size={25}
            onClick={handlePrevious}
            style={{ paddingRight: 4 }}
          />
          {isPlaying ? (
            <FaPause size={25} onClick={handlePlayPause} />
          ) : (
            <FaPlay size={25} onClick={handlePlayPause} />
          )}
          <FaStepForward size={25} onClick={handleNext} key={"forward"} />
        </PlayBackControls>
      </Controls>
      <Droppable droppableId="timeline" direction="horizontal">
        {(provided) => {
          return (
            <TimelineContainer
              onMouseMove={handlMouseMove}
              ref={scrollableDivRef}
              onDoubleClick={handleTimelineClick}
              style={{
                opacity: order.length === 0 ? 0.5 : 1,
                pointerEvents: order.length === 0 ? "none" : "auto",
              }}
            >
              {order.length === 0 && (
                <EmptyTimeline>Please add Audios to Timeline</EmptyTimeline>
              )}
              <LineDraggable
                axis="x"
                onDrag={handleDrag}
                ref={timelineDraggableRef}
                defaultPosition={{ x: 10, y: 0 }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    width: "4px",
                    height: "100%",
                    background: "#9BABB1",
                    zIndex: 1000,
                    transform: "translateX(-50%)",
                  }}
                />
              </LineDraggable>
              <WaveForms {...provided.droppableProps} ref={provided.innerRef}>
                {timelines}
                {provided.placeholder}
              </WaveForms>
            </TimelineContainer>
          );
        }}
      </Droppable>
      <AudioPlayer
        ref={audioRef}
        src={audios[order[currentSongIndex | 0]]?.url}
        listenInterval={1000}
        onListen={handleTimeUpdate}
        onEnded={handleNext}
        autoPlay
      />
    </PlaybackContainer>
  );
};
