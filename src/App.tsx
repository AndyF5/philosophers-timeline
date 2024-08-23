import "./App.css";
import Assets from "./assets";
import philosophers from "./data/philosophers.json";
import NivoTimeline from "./NivoTimeline";

export interface Philosopher {
  Philosopher: string;
  Born: string;
  Died: string;
}

function App() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // dark mode
  }

  const gitHubLogo =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Assets.GitHubLogoWhite
      : Assets.GitHubLogoBlack;

  return (
    <>
      <h1>Philosophers Timeline</h1>

      <NivoTimeline philosophers={philosophers} />

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
