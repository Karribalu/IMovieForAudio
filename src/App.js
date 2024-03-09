import "./App.css";
import { UploadComponent } from "./components/UploadComponents";
import { Timeline } from "./components/Timeline";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
function App() {
  const [timelineAudios, setTimeLineAudios] = useState([]);
  return (
    <div className="App">
      <Navbar />
      <UploadComponent setTimeLineAudios={setTimeLineAudios} />
      <Timeline audios={timelineAudios} />
    </div>
  );
}

export default App;
