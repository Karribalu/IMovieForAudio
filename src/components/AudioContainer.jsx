import React from "react";
import { FcAudioFile } from "react-icons/fc";
import { Draggable } from "@hello-pangea/dnd";
import { AudioFile } from "../styles/AudioContainerStyles";
/**
 * @author
 * @function AudioContainer
 **/

const getMinutes = (time) => {
  let minutes = Math.floor(time / 60);
  if (minutes < 10) {
    return "0" + minutes;
  }
  return minutes;
};
const getSeconds = (time) => {
  let seconds = Math.floor(time - getMinutes(time) * 60);
  if (seconds < 10) {
    return "0" + seconds;
  }
  return seconds;
};
export const AudioContainer = (props) => {
  const { audio, index } = props;
  return (
    <Draggable draggableId={audio.name} index={index} key={audio.name}>
      {(provided, snapshot, innerRef) => {
        return (
          <AudioFile
            ref={provided.innerRef}
            {...provided.draggableProps}
            // isdragging={snapshot.isDragging | false}
            {...provided.dragHandleProps}
            // key={index}
          >
            <FcAudioFile size={50} />
            <p style={{ fontSize: 12, lineHeight: 0 }}>
              {audio.name.split(".")[0]}
            </p>
            <p style={{ fontSize: 10, lineHeight: 0 }}>
              {getMinutes(audio.duration) + ":" + getSeconds(audio.duration)}
            </p>
          </AudioFile>
        );
      }}
    </Draggable>
  );
};
