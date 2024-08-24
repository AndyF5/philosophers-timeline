import { useEffect, useState } from "react";
import "./App.css";
import Assets from "./assets";
import NivoTimeline from "./NivoTimeline/NivoTimeline";
import Data from "./data/fetchData";
import { Event, Philosopher } from "./models";

function App() {
  const [philosophers, setPhilosophers] = useState<Philosopher[] | null>(null);
  const [events, setEvents] = useState<Event[] | null>(null);

  const gitHubLogo =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Assets.GitHubLogoWhite
      : Assets.GitHubLogoBlack;

  const getData = async () => {
    const [philiosphersData, eventData] = await Promise.all([
      Data.fetchPhilosophers(),
      Data.fetchEvents(),
    ]);

    setPhilosophers(philiosphersData);
    setEvents(eventData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Philosophers Timeline</h1>

      <p>
        A timeline of various philosophers, as well as some important historical
        figures and events.
      </p>

      {philosophers && events ? (
        <NivoTimeline philosophers={philosophers ?? []} events={events} />
      ) : (
        <div className="loader" />
      )}

      <a
        href="https://github.com/AndyF5/philosophers-timeline"
        id="github-link"
      >
        <img src={gitHubLogo} id="github-logo" />
        GitHub
      </a>
    </>
  );
}

export default App;
