import React from "react";
import { FcAudioFile } from "react-icons/fc";
import { Draggable } from "@hello-pangea/dnd";
import { AudioFile } from "../styles/AudioContainerStyles";
import { getMinutes, getSeconds } from "../utils";

export const AudioContainer = (props) => {
  const { audio, index, selectedAudios, handleCheck } = props;
  return (
    <Draggable draggableId={audio.name} index={index} key={audio.name}>
      {(provided) => {
        return (
          <AudioFile
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <FcAudioFile size={70} />
            <p style={{ fontSize: 16, lineHeight: 0, color: "white" }}>
              {audio.name.split(".")[0]}
            </p>
            <p style={{ fontSize: 16, lineHeight: 0, color: "white" }}>
              {getMinutes(audio.duration) + ":" + getSeconds(audio.duration)}
            </p>
            <input
              type="checkbox"
              onChange={handleCheck}
              value={audio.name}
              checked={selectedAudios.includes(audio.name)}
            />
          </AudioFile>
        );
      }}
    </Draggable>
  );
};
