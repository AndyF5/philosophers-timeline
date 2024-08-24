import { ResponsiveBar } from "@nivo/bar";
import { Event, Philosopher } from "../models";
import "./NivoTimeline.css";
import { CartesianMarkerProps, DatumValue } from "@nivo/core";

type NivoPhilosopher = {
  philosopher: string;
  born: number;
  life: number;
};

const nivoPhilosopherAdaptor = (
  philosophers: Philosopher[]
): { data: NivoPhilosopher[]; min: number; max: number } => {
  let min = new Date().getFullYear();
  let max = new Date().getFullYear();

  const data = philosophers.map((philosopher) => {
    const birthYear = new Date(philosopher.Born).getFullYear();

    const deathYear = new Date(philosopher.Died).getFullYear();

    const lifeYears = deathYear - birthYear;

    if (Number.isNaN(lifeYears)) {
      console.error("Invalid dates.", philosopher);
      throw new Error("Invalid dates.");
    }

    if (birthYear < min) {
      min = birthYear;
    }

    if (deathYear > max) {
      max = deathYear;
    }

    return {
      philosopher: philosopher.Philosopher,
      born: birthYear,
      life: lifeYears,
    };
  });

  min = Math.floor(min / 50) * 50;

  max = Math.ceil(max / 50) * 50;

  data.sort((a, b) => b.born - a.born);

  return {
    data,
    min,
    max,
  };
};

interface NivoTimelineProps {
  philosophers: Philosopher[];
  events: Event[];
}

const NivoTimeline = ({
  philosophers,
  events,
}: NivoTimelineProps): JSX.Element => {
  const { data, min, max } = nivoPhilosopherAdaptor(philosophers);

  const eventMarkers: CartesianMarkerProps<DatumValue>[] = events.map(
    (event) => ({
      axis: "x",
      legend: event.event + " " + event.year,
      value: event.year,
      lineStyle: {
        stroke: "#CF4D6F",
      },
      legendOrientation: "vertical",
      legendPosition: "top-left",
      textStyle: {
        fill: "#CF4D6F",
      },
    })
  );

  return (
    <div id="nivo-timeline-container">
      <div
        style={{
          height: `${data.length * 30}px`,
          width: "2000px",
        }}
      >
        <ResponsiveBar
          data={data}
          indexBy="philosopher"
          keys={["born", "life"]}
          minValue={min}
          maxValue={max}
          markers={[
            {
              axis: "x",
              legend: "Present day",
              value: new Date().getFullYear(),
              lineStyle: {
                stroke: "#CF4D6F",
              },
              legendOrientation: "vertical",
              legendPosition: "top-left",
              textStyle: {
                fill: "#CF4D6F",
              },
            },
            ...eventMarkers,
          ]}
          colors={["#ffffff00", "#FBC2B5"]}
          theme={{
            text: {
              fill: "#8d9cab",
            },
          }}
          layout="horizontal"
          enableLabel={false}
          margin={{ top: 50, right: 20, bottom: 20, left: 150 }}
          enableGridX
          isInteractive={false}
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
        />
      </div>
    </div>
  );
};

export default NivoTimeline;
