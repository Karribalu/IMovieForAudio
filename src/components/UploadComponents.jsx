import { useState, useEffect, useRef } from "react";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { Droppable } from "@hello-pangea/dnd";
import { AudioContainer } from "./AudioContainer";
import {
  AudioContainerStyle,
  Heading,
  Import,
  ImportText,
  UploadContainer,
} from "../styles/UploadComponentsStyles";
var a;
const UploadComponent = (props) => {
  const { audios, setAudios, order, setOrder } = props;
  const uploadRef = useRef(null);
  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState();
  useEffect(() => {
    if (a) {
      a.pause();
      a = null;
      setButtonName("Play");
    }
    if (audio) {
      a = new Audio(audio);
      a.onended = () => {
        setButtonName("Play");
      };
    }
  }, [audio]);

  const handleClick = () => {
    if (buttonName === "Play") {
      a.play();
      setButtonName("Pause");
    } else {
      a.pause();
      setButtonName("Play");
    }
  };

  const addFile = async (e) => {
    Object.values(e.target.files).map(async (file) => {
      let url = URL.createObjectURL(file);
      let newFile = {
        name: file.name,
        url: url,
        duration: await getAudioDuration(url),
      };
      setAudios((prev) => ({ ...prev, [file.name]: newFile }));
      setOrder((prev) => [...prev, file.name]);
    });
  };
  async function getAudioDuration(audioURL) {
    const audio = new Audio(audioURL); // Create an audio element

    // Ensure the audio is fully loaded before accessing duration
    await new Promise((resolve) => {
      audio.addEventListener("loadedmetadata", resolve);
    });

    return audio.duration; // Return the duration in seconds
  }

  const handleUpload = () => {
    uploadRef.current.click();
  };

  return (
    <UploadContainer>
      <input
        type="file"
        accept="audio/*"
        multiple
        ref={uploadRef}
        hidden={true}
        onChange={addFile}
      />
      <Heading>
        <h3>Audio Files</h3>
        <Import onClick={handleUpload}>
          <BsArrowDownSquareFill />
          <ImportText>Import Audio</ImportText>
        </Import>
      </Heading>
      <Droppable droppableId={"audios"} direction="horizontal" type="column">
        {(provided, snapshot) => {
          return (
            <AudioContainerStyle
              {...provided.droppableProps}
              ref={provided.innerRef}
              key={"droppable"}
              isdraggingover={snapshot.isDraggingOver | false}
            >
              {order.map((item, index) => {
                return (
                  <AudioContainer
                    audio={audios[item]}
                    index={index}
                    key={index}
                  />
                );
              })}
              {provided.placeholder}
            </AudioContainerStyle>
          );
        }}
      </Droppable>
    </UploadContainer>
  );
};

export { UploadComponent };
