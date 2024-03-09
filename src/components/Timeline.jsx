import React, { useState, useRef, useMemo, useEffect } from "react";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import MultiTrack from "wavesurfer-multitrack";
import { RiReplay30Line } from "react-icons/ri";
import { RiForward30Line } from "react-icons/ri";

import {
  PlayBackControls,
  PlaybackContainer,
  Range,
  TimelineHeader,
  ZoomControl,
} from "../styles/TimelineStyles";

export const Timeline = (props) => {
  const { audios } = props;
  const [isPlaying, setIsPlaying] = useState(true);
  const multiTrack = useRef(null);
  const options = {
    minPxPerSec: 10, // zoom level
    rightButtonDrag: false, // set to true to drag with right mouse button
    cursorWidth: 2,
    cursorColor: "green",
    trackBackground: "#14121f",
    trackBorderColor: "#7C7C7C",
    dragBounds: true,
    container: document.querySelector("#container-track"),
    timelineOptions: {
      secondaryLabelOpacity: 1,
      style: {
        color: "white",
      },
    },
  };
  useEffect(() => {
    if (multiTrack.current) {
      if (isPlaying) {
        multiTrack.current.play();
      } else {
        multiTrack.current.pause();
      }
    }
  }, [isPlaying]);
  useEffect(() => {
    if (multiTrack.current) {
      multiTrack.current.destroy();
    }
    if (Object.values(audios).length > 0) {
      let tracks = [];
      Object.values(audios)?.map((audio, index) => {
        tracks.push({
          id: index,
          draggable: true,
          options: {
            waveColor: "#19327d",
            progressColor: "#84aae6",
          },
          url: audio.url,
        });
      });
      const waveform = MultiTrack.create(tracks, options);
      waveform.once("canplay", () => {
        waveform.play();
        multiTrack.current = waveform;
        multiTrack.current.play();
        setIsPlaying(true);
      });
    }
  }, [audios]);
  const handlePrevious = () => {
    if (multiTrack.current) {
      multiTrack.current.setTime(multiTrack.current.getCurrentTime() - 30);
    }
  };
  const handleNext = () => {
    if (multiTrack.current) {
      multiTrack.current.setTime(multiTrack.current.getCurrentTime() + 30);
    }
  };
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleZoom = (event) => {
    if (multiTrack.current) {
      multiTrack.current.zoom(event.target.value);
    }
  };
  return (
    <PlaybackContainer>
      <TimelineHeader>
        <h3>Timeline</h3>
        <PlayBackControls>
          <RiReplay30Line
            size={25}
            onClick={handlePrevious}
            style={{ paddingRight: 4, cursor: "pointer" }}
          />
          {isPlaying ? (
            <FaPause
              size={25}
              onClick={handlePlayPause}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FaPlay
              size={25}
              onClick={handlePlayPause}
              style={{ cursor: "pointer" }}
            />
          )}
          <RiForward30Line
            size={25}
            onClick={handleNext}
            style={{ cursor: "pointer" }}
          />
        </PlayBackControls>
        <ZoomControl>
          <p style={{ fontSize: 18, fontWeight: 600 }}>Zoom:</p>
          <Range
            type="range"
            onChange={handleZoom}
            defaultValue={0}
            color="black"
          />
        </ZoomControl>
      </TimelineHeader>
      <div id="container-track" style={{ backgroundColor: "#14121f" }} />
    </PlaybackContainer>
  );
};
