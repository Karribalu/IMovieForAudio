import { useState, useEffect, useRef } from "react";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { FcAudioFile } from "react-icons/fc";
import styles from "../styles/UploadComponents.module.css";
var a;
const UploadComponent = () => {
  const uploadRef = useRef(null);
  const [buttonName, setButtonName] = useState("Play");
  const [uploadedAudios, setUploadedAudios] = useState([
    1, 2, 3, 4, 10, 55, 5, 2, 2, 2, 2, 2, 2, 2, 2,
  ]);

  const [audio, setAudio] = useState();

  useEffect(() => {
    console.log(uploadedAudios);
    uploadedAudios.forEach((item) => {
      console.log("files uploaded", item);
    });
  }, [uploadedAudios]);
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

  const addFile = (e) => {
    let allAudios = [];
    setUploadedAudios((prev) => [...prev, ...Object.values(e.target.files)]);
  };

  const handleUpload = () => {
    uploadRef.current.click();
  };
  return (
    <div className={styles.container}>
      <input
        type="file"
        accept="audio/*"
        multiple
        ref={uploadRef}
        hidden={true}
        onChange={addFile}
      />
      <div className={styles.heading}>
        <h3>Audio Files</h3>
        <div className={styles.import} onClick={handleUpload}>
          <BsArrowDownSquareFill />
          <span className={styles.importText}>Import Audio</span>
        </div>
      </div>

      {/* <button onClick={handleClick}>{buttonName}</button> */}
      <div className={styles.audioContainer}>
        {uploadedAudios.map((item, index) => {
          return (
            <div className={styles.audioFile}>
              <FcAudioFile size={50} />
              <p style={{ fontSize: 12 }}>Audio {index}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { UploadComponent };
