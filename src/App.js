import "./App.css";
import { UploadComponent } from "./components/UploadComponents";
import { Timeline } from "./components/Timeline";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
function App() {
  const [timelineAudios, setTimeLineAudios] = useState({});
  const [timelineOrder, setTimelineOrder] = useState([]);
  const [audios, setAudios] = useState({});
  const [order, setOrder] = useState([]);
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
    if (
      destination.droppableId === source.droppableId &&
      destination.droppableId === "timeline"
    ) {
      // Handling drag and drop in the timeline
      const newOrder = Array.from(timelineOrder);
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);
      setTimelineOrder(newOrder);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <UploadComponent
          audios={audios}
          order={order}
          setAudios={setAudios}
          setOrder={setOrder}
          timelineOrder={timelineOrder}
          timelineAudios={timelineAudios}
          setTimeLineAudios={setTimeLineAudios}
          setTimelineOrder={setTimelineOrder}
        />
        <Timeline order={timelineOrder} audios={timelineAudios} />
      </DragDropContext>
    </div>
  );
}

export default App;
