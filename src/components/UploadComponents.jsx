import { useState, useEffect, useRef } from "react";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { FcAudioFile } from "react-icons/fc";
import styles from "../styles/UploadComponents.module.css";
import audio1 from "../assets/audios/audio1.mp3";
import audio2 from "../assets/audios/audio2.mp3";
import audio3 from "../assets/audios/audio3.mp3";
var a;
const UploadComponent = () => {
  const uploadRef = useRef(null);
  const [buttonName, setButtonName] = useState("Play");
  const [audios, setAudios] = useState({
    "audio1.mp3": {
      url: audio1,
      duration: 267.75,
    },
    "audio2.mp3": {
      url: audio2,
      duration: 248.3,
    },
    "audio3.mp3": {
      url: audio3,
      duration: 118.5,
    },
  });
  const [order, setOrder] = useState([
    "audio1.mp3",
    "audio2.mp3",
    "audio3.mp3",
  ]);
  const [uploadedAudios, setUploadedAudios] = useState({
    audios: {},
    order: [],
  });

  const [audio, setAudio] = useState();
  useEffect(() => {
    console.log(order);
    // uploadedAudios.forEach((item) => {
    //   console.log("files uploaded", item);
    // });
  }, [order]);
  useEffect(() => {
    console.log(audios);
    // uploadedAudios.forEach((item) => {
    //   console.log("files uploaded", item);
    // });
  }, [audios]);
  useEffect(() => {
    console.log(uploadedAudios);
    // uploadedAudios.forEach((item) => {
    //   console.log("files uploaded", item);
    // });
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
      <div className={styles.audioContainer}>
        {order.map((item, index) => {
          return (
            <div className={styles.audioFile} key={index}>
              <FcAudioFile size={50} />
              <p style={{ fontSize: 12, lineHeight: 0 }}>
                {item.split(".")[0]}
              </p>
              <p style={{ fontSize: 10, lineHeight: 0 }}>
                {getMinutes(audios[item].duration) +
                  ":" +
                  getSeconds(audios[item].duration)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { UploadComponent };
