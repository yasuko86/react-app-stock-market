import { sample_history }  from "./fixtures/history";
import { historyFilterDefaultState, historyFilterValidValues, historyFilterValidStartInvalidEnd, historyFilterOutOfRange } from "./fixtures/historyFilters"
import { empty_stocks } from "./fixtures/stocks";

describe("Test the filtering process in HistoryPage component", () => {

  let visibleHistory; 

  // Prepare the dummy function here as we cannot export setVisibleHistory directly from HistoryPage component
  const setVisibleHistory = (allHistory, historyFilter) => {
    return allHistory.filter(day => {
      const startDateMatch = historyFilter.startDate ? historyFilter.startDate.isSameOrBefore(day.timestamp, 'day') : true;
      const endDateMatch = historyFilter.endDate ? historyFilter.endDate.isSameOrAfter(day.timestamp, 'day') : true;
      
      return startDateMatch && endDateMatch; 
    });
  }; 

  it("should not filter when the filter values are not set", () => {
    visibleHistory = setVisibleHistory(sample_history, historyFilterDefaultState); 
    expect(visibleHistory.length).toBe(sample_history.length);
  });
  
  it("should filter correctly with code", () => {
    visibleHistory = setVisibleHistory(sample_history, historyFilterValidValues); 
    expect(visibleHistory.length).toBe(2);
  });
  
  it("should filter correctly with industry", () => {
    visibleHistory = setVisibleHistory(sample_history, historyFilterValidStartInvalidEnd); 
    expect(visibleHistory.length).toBe(1);
  });
  
  it("should filter correctly both with code and industry", () => {
    visibleHistory = setVisibleHistory(sample_history, historyFilterOutOfRange); 
    expect(visibleHistory.length).toBe(0);
  });

  it("always returns 0 when the price history records are empty, but doesn't crash the program", () => {
    visibleHistory = setVisibleHistory(empty_stocks, historyFilterValidValues); 
    expect(visibleHistory.length).toBe(0);
  });
});
