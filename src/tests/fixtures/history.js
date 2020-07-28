import moment from "moment";

const sample_history = [
  { 
    timestamp: moment("2020-03-23T14:00:00.000Z"), 
    symbol: "AAL", 
    name: "American Airlines Group", 
    industry:"Industrials", 
    open: 10.9, 
    high: 11.36, 
    low: 10.01, 
    close: 10.25, 
    volumes: 55494100 
  },
  { 
    timestamp: moment("2020-02-27T14:00:00.000Z"), 
    symbol: "AAL", 
    name: "American Airlines Group", 
    industry:"Industrials", 
    open: 20.85,
    high: 22.48, 
    low: 19.77, 
    close: 20.6, 
    volumes: 31897300 
  },
  { 
    timestamp: moment("2020-01-30T14:00:00.000Z"), 
    symbol: "AAL", 
    name: "American Airlines Group", 
    industry:"Industrials", 
    open: 26.88, 
    high: 27.49, 
    low: 26.74, 
    close: 28.8, 
    volumes: 9094410 
  },
];

// api doesn't return any data
const empty_history = [];

// history data that doesn't have the all neccessary field
const invalid_history_notimestamp = [
  { 
    symbol: "AAL", 
    name: "American Airlines Group", 
    industry:"Industrials", 
    open: 10.9, 
    high: 11.36, 
    low: 10.01, 
    close: 10.25, 
    volumes: 55494100 
  },
  { 
    symbol: "AAL", 
    name: "American Airlines Group", 
    industry:"Industrials", 
    open: 20.85,
    high: 22.48, 
    low: 19.77, 
    close: 20.6, 
    volumes: 31897300 
  },
  { 
    symbol: "AAL", 
    name: "American Airlines Group", 
    industry:"Industrials", 
    open: 26.88, 
    high: 27.49, 
    low: 26.74, 
    close: 28.8, 
    volumes: 9094410 
  },
];

export { sample_history, empty_history, invalid_history_notimestamp }