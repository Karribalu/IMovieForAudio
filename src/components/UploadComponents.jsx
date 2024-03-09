import { useState, useRef, useEffect, useCallback } from "react";
import { BsArrowDownSquareFill } from "react-icons/bs";
import {
  DragAndDrop,
  Heading,
  UploadContainer,
} from "../styles/UploadComponentsStyles";
import Dropzone from "react-dropzone";
const UploadComponent = (props) => {
  const { setTimeLineAudios } = props;
  const [added, setAdded] = useState(0);
  useEffect(() => {
    if (added > 0) {
      setTimeout(() => {
        setAdded(0);
      }, [5000]);
    }
  }, [added]);
  const addToTimeline = (files) => {
    const newFiles = [];
    files.map((file) => {
      console.log(file);
      if (file?.type?.startsWith("audio")) {
        let url = URL.createObjectURL(file);
        let newFile = {
          name: file.name,
          url: url,
        };
        newFiles.push(newFile);
      }
    });
    setTimeLineAudios((prev) => [...prev, ...newFiles]);
    setAdded(newFiles.length);
  };

  const handleDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      addToTimeline(acceptedFiles);
    }
  }, []);

  return (
    <UploadContainer>
      <Heading>
        {added > 0 && (
          <p style={{ color: "green" }}>
            {added} Audio(s) added to the Timeline
          </p>
        )}
      </Heading>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section>
            <DragAndDrop {...getRootProps()}>
              <input
                {...getInputProps()}
                accept="audio/mpeg,audio/ogg,audios/wav"
              />

              <BsArrowDownSquareFill size={20} />
              {isDragActive ? (
                <p>Drop to add! </p>
              ) : (
                <p>Drag 'n' drop some audio(s) here, or click to select</p>
              )}
            </DragAndDrop>
          </section>
        )}
      </Dropzone>
    </UploadContainer>
  );
};

export { UploadComponent };
