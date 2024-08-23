import "./App.css";
import philosophers from "./data/philosophers.json";
import NivoTimeline from "./NivoTimeline";

export interface Philosopher {
  Philosopher: string;
  Born: string;
  Died: string;
}

function App() {
  return (
    <>
      <h1>Philosophers Timeline</h1>

      <NivoTimeline philosophers={philosophers} />
    </>
  );
}

export default App;
