import React from "react";
import { FcAudioFile } from "react-icons/fc";
import { Draggable } from "@hello-pangea/dnd";
import {
  AudioFile,
  AudioFileName,
  CheckBox,
} from "../styles/AudioContainerStyles";
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
            <FcAudioFile size={50} />
            <AudioFileName>{audio.name.split(".")[0]}</AudioFileName>
            <AudioFileName>
              {getMinutes(audio.duration) + ":" + getSeconds(audio.duration)}
            </AudioFileName>
            <CheckBox
              type="checkbox"
              onChange={handleCheck}
              value={audio.name}
            />
          </AudioFile>
        );
      }}
    </Draggable>
  );
};
