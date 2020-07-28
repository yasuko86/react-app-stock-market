import React from "react";
import { mount } from "enzyme";
import moment from 'moment';
import HistoryFilter from "../components/HistoryFilter";
import MyContext from "../utils/MyContext";
import { historyFilterDefaultState, historyFilterValidValues } from "./fixtures/historyFilters";
import 'react-dates/initialize';

// use mount of enzyme instead of react-testing-library as DateRangePicker of react-date doesn't work well with react-testing-library

describe("Test the state management inside the StockFilter component with React Context", () => {

  let setHistoryFilter;
  beforeEach(() => {
    setHistoryFilter = jest.fn();
  });

  const TestComponent = ({ historyFilter }) => (
    <MyContext.Provider value={[historyFilter, setHistoryFilter]}>
      <HistoryFilter />
    </MyContext.Provider>
  );

  it("set StockFilter correnctly with default filter value", () => {
    const element = mount(<TestComponent historyFilter={historyFilterDefaultState}/>);
    expect(element.find("withStyles(DateRangePicker)").prop("startDate")).toBeNull();
    expect(element.find("withStyles(DateRangePicker)").prop("endDate")).toBeNull();
  })
  
  it("set StockFilter correnctly with default filter value", () => {
    const element = mount(<TestComponent historyFilter={historyFilterValidValues}/>);
    expect(element.find("withStyles(DateRangePicker)").prop("startDate")).toEqual(historyFilterValidValues.startDate);
    expect(element.find("withStyles(DateRangePicker)").prop("endDate")).toEqual(historyFilterValidValues.endDate);
  })
  
  it("handle StockFilter correnctly with default filter value", () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
  
    const element = mount(<TestComponent historyFilter={historyFilterDefaultState}/>);
    element.find("withStyles(DateRangePicker)").prop("onDatesChange")({ startDate, endDate });
  
    expect(setHistoryFilter).toHaveBeenLastCalledWith({ startDate, endDate});
  })

});

