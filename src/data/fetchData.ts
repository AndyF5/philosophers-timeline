import Papa from "papaparse";
import { Event, Philosopher } from "../models";

const fetchPhilosophers = async (): Promise<Philosopher[]> => {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/1D-ow_CRawf3dsOkHJDNu_gMfIZ6JPcxHoX4H8Y_Stx0/pub?output=csv"
  );

  const result = await response.text();

  const parsedData = Papa.parse<string[]>(result).data;

  return parsedData.slice(1).map((data) => ({
    Philosopher: data[0],
    Born: data[1],
    Died: data[2],
  }));
};

const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/1D-ow_CRawf3dsOkHJDNu_gMfIZ6JPcxHoX4H8Y_Stx0/pub?gid=760075930&single=true&output=csv"
  );

  const result = await response.text();

  const parsedData = Papa.parse<string[]>(result).data;

  return parsedData.slice(1).map((data) => ({
    event: data[0],
    year: parseInt(data[1]),
  }));
};

const Data = {
  fetchEvents,
  fetchPhilosophers,
};

export default Data;
