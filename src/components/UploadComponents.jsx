import { useState, useRef } from "react";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { Droppable } from "@hello-pangea/dnd";
import { AudioContainer } from "./AudioContainer";
import {
  AudioContainerStyle,
  Button,
  Heading,
  Import,
  ImportText,
  UploadContainer,
} from "../styles/UploadComponentsStyles";
import { v4 as uuid } from "uuid";
const UploadComponent = (props) => {
  const {
    audios,
    setAudios,
    order,
    setOrder,
    setTimeLineAudios,
  } = props;
  const uploadRef = useRef(null);
  const [selectedAudios, setSelectedAudios] = useState([]);
  const [added, setAdded] = useState(0);
  const addFile = async (e) => {
    Object.values(e.target.files).map(async (file) => {
      let url = URL.createObjectURL(file);
      let newFile = {
        name: file.name,
        url: url,
        duration: await getAudioDuration(url),
      };
      setAudios((prev) => ({ ...prev, [file.name]: newFile }));
      if (!order.includes(file.name)) {
        setOrder((prev) => [...prev, file.name]);
      }
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
  const handleCheck = (event) => {
    let prev = [...selectedAudios];
    if (event.target.checked) {
      prev.push(event.target.value);
    } else {
      const index = prev.indexOf(5);
      if (index > -1) {
        // Only splice the array when the item is found
        prev.splice(index, 1);
      }
    }
    setSelectedAudios(prev);
  };
  const ImportComponent = (props) => (
    <Import onClick={handleUpload} {...props}>
      <BsArrowDownSquareFill />
      <ImportText>Import Audio(s)</ImportText>
    </Import>
  );
  const handleAdd = () => {
    let tempSelectedAudios = [];
    selectedAudios.map((audio) => {
      tempSelectedAudios.push(audios[audio]);
    });
    setTimeLineAudios(tempSelectedAudios);
    setAdded(selectedAudios.length);
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
        {added > 0 && (
          <p style={{ color: "green" }}>
            {added} Audio(s) added to the Timeline
          </p>
        )}
        {order.length > 0 && <ImportComponent />}
      </Heading>
      {order.length === 0 && <ImportComponent />}
      {order.length !== 0 && (
        <Droppable droppableId={"audios"} direction="horizontal" type="column">
          {(provided) => {
            return (
              <AudioContainerStyle
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {order.map((item, index) => {
                  return (
                    <AudioContainer
                      audio={audios[item]}
                      index={index}
                      key={index}
                      handleCheck={handleCheck}
                      selectedAudios={selectedAudios}
                    />
                  );
                })}
                {provided.placeholder}
              </AudioContainerStyle>
            );
          }}
        </Droppable>
      )}
      {order.length !== 0 && (
        <Button onClick={handleAdd}>Add to Timeline</Button>
      )}
    </UploadContainer>
  );
};

export { UploadComponent };
