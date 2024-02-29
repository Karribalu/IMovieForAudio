import logo from "./logo.svg";
import "./App.css";
import { UploadComponent } from "./components/UploadComponents";
import { Timeline } from "./components/Timeline";

function App() {
  return (
    <div className="App">
      <UploadComponent />
      <Timeline />
    </div>
  );
}

export default App;
