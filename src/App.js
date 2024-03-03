import logo from "./logo.svg";
import "./App.css";
import { UploadComponent } from "./components/UploadComponents";
import { Timeline } from "./components/Timeline";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import audio1 from "./assets/audios/audio1.mp3";
import audio2 from "./assets/audios/audio2.mp3";
import audio3 from "./assets/audios/audio3.mp3";
function App() {
  const [audios, setAudios] = useState({
    "audio1.mp3": {
      url: audio1,
      duration: 267.75,
      name: "audio1.mp3",
    },
    "audio2.mp3": {
      url: audio2,
      duration: 248.3,
      name: "audio2.mp3",
    },
    "audio3.mp3": {
      url: audio3,
      duration: 118.5,
      name: "audio3.mp3",
    },
  });
  const [order, setOrder] = useState([
    "audio1.mp3",
    "audio2.mp3",
    "audio3.mp3",
  ]);
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log("destination", destination);
    console.log("source", source);
    console.log("draggableId", draggableId);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newTaskIds = Array.from(order);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    console.log("order changed", newTaskIds);
    setOrder(newTaskIds);
  };
  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <UploadComponent
          audios={audios}
          order={order}
          setAudios={setAudios}
          setOrder={setOrder}
        />
        <Timeline />
      </DragDropContext>
    </div>
  );
}

export default App;
