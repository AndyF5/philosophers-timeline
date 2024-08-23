import { ResponsiveBar } from "@nivo/bar";
import { Philosopher } from "./App";

type NivoPhilosopher = {
  philosopher: string;
  born: number;
  life: number;
};

const nivoPhilosopherAdaptor = (
  philosophers: Philosopher[]
): { data: NivoPhilosopher[]; min: number; max: number } => {
  let min = 0;
  let max = 0;

  const data = philosophers.map((philosopher, i) => {
    const birthYear = new Date(philosopher.Born).getFullYear();

    const deathYear = new Date(philosopher.Died).getFullYear();

    const lifeYears = deathYear - birthYear;

    if (i === 0 || birthYear < min) {
      min = birthYear;
    }

    if (i === 0 || deathYear > max) {
      max = deathYear;
    }

    return {
      philosopher: philosopher.Philosopher,
      born: birthYear,
      life: lifeYears,
    };
  });

  data.sort((a, b) => b.born - a.born);

  return {
    data,
    min,
    max,
  };
};

interface NivoTimelineProps {
  philosophers: Philosopher[];
}

const NivoTimeline = ({ philosophers }: NivoTimelineProps): JSX.Element => {
  const { data, min, max } = nivoPhilosopherAdaptor(philosophers);

  return (
    <div
      style={{
        height: `${data.length * 30}px`,
        width: "max(80vw, 1000px)",
      }}
    >
      <ResponsiveBar
        data={data}
        indexBy="philosopher"
        keys={["born", "life"]}
        minValue={min}
        maxValue={max}
        colors={["#ffffff00", "#22ffee"]}
        layout="horizontal"
        enableLabel={false}
        margin={{ top: 50, right: 20, bottom: 20, left: 130 }}
        enableGridX
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -32,
          truncateTickAt: 0,
        }}
        axisTop={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisBottom={null}
        theme={{
          text: {
            fill: "#fff",
          },
        }}
        isInteractive={false}
      />
    </div>
  );
};

export default NivoTimeline;
