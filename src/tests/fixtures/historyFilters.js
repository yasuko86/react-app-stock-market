import moment from "moment";

const historyFilterDefaultState = {
  startDate: null,
  endDate: null,
};

// Filter with values in range
const historyFilterValidValues = {
  startDate: moment("2020-02-01T14:00:00.000Z"), 
  endDate: moment("2020-03-31T14:00:00.000Z"), 
};

//Filter with start value in range and end value out of range
const historyFilterValidStartInvalidEnd = {
  startDate: moment("2020-03-15T14:00:00.000Z"), 
  endDate: moment("2020-04-15T14:00:00.000Z"), 
};

// Filter with dates of out of range
const historyFilterOutOfRange = {
  startDate: moment("2020-04-01T14:00:00.000Z"), 
  endDate: moment("2020-04-31T14:00:00.000Z"), 
};

export { historyFilterDefaultState, historyFilterValidValues, historyFilterValidStartInvalidEnd, historyFilterOutOfRange };