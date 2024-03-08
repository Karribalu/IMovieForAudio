import "./App.css";
import { UploadComponent } from "./components/UploadComponents";
import { Timeline } from "./components/Timeline";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
function App() {
  const [timelineAudios, setTimeLineAudios] = useState([]);
  const [audios, setAudios] = useState({});
  const [order, setOrder] = useState([]);
  const [flag, setFlag] = useState(false);
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Handling drag and drop in the Add Files Component
    const newOrder = Array.from(order);
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, draggableId);
    setOrder(newOrder);
  };
  return (
    <div className="App">
      <Navbar />
      <DragDropContext onDragEnd={onDragEnd}>
        <UploadComponent
          audios={audios}
          order={order}
          setAudios={setAudios}
          setOrder={setOrder}
          timelineAudios={timelineAudios}
          setTimeLineAudios={setTimeLineAudios}
          setFlag={setFlag}
          flag={flag}
        />
        <Timeline audios={timelineAudios} />
      </DragDropContext>
    </div>
  );
}

export default App;
