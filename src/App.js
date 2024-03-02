import logo from "./logo.svg";
import "./App.css";
import { UploadComponent } from "./components/UploadComponents";
import { Timeline } from "./components/Timeline";
import { DragDropContext } from "@hello-pangea/dnd";
function App() {
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log(
      `destination: ${destination} \n source: ${source} \n id: ${draggableId} \n type=${type}`
    );
  };
  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <UploadComponent />
        <Timeline />
      </DragDropContext>
    </div>
  );
}

export default App;
