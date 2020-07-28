import React from "react";
import { render, fireEvent, cleanup } from '@testing-library/react';
import StockFilter from "../components/StockFilter";
import MyContext from "../utils/MyContext";
import { stockFilterDefaultState, stockFilterWithValidValues } from "./fixtures/stockFilters";

describe("Test the state management inside the StockFilter component with React Context", () => {

  const sample_industry_options = [ "Industrials", "Information Technology",  "Financials"]; 
  let setStockFilter;

  beforeEach(() => {
    setStockFilter = jest.fn();
  });

  afterEach(cleanup)

  const renderStockFilter = (stockFilter, industryList) => {
    const tree = (
      <MyContext.Provider value={[stockFilter, setStockFilter]}>
        <StockFilter industryOptions={industryList} />
      </MyContext.Provider>
    );
    return render(tree)
  }

  it("set the select option value correctly from props", () => {
    const wrapper = renderStockFilter(stockFilterDefaultState, sample_industry_options);
    const options = wrapper.getAllByTestId("industry-options").map(element => element.value);
    expect(options).toEqual(["", ...sample_industry_options]);
  })
  
  it("set StockFilter correnctly with default filter value using Context", () => {
    const wrapper = renderStockFilter(stockFilterDefaultState, sample_industry_options);
    expect(wrapper.getByTestId("code-filter").value).toBe("");
    expect(wrapper.getByTestId("industry-filter").value).toBe("");
  })
  
  it("set StockFilter correnctly with sample filter values using Context", () => {
    const wrapper = renderStockFilter(stockFilterWithValidValues, sample_industry_options);
    expect(wrapper.getByTestId("code-filter").value).toBe("A");
    expect(wrapper.getByTestId("industry-filter").value).toBe("Information Technology");
  })
  
  it("handle 'code' for StockFilter correctly", () => {
    const wrapper = renderStockFilter(stockFilterDefaultState, sample_industry_options);
    const input = wrapper.getByTestId("code-filter");
  
    fireEvent.change(input, { target: { value: "A" }});
    expect(setStockFilter).toHaveBeenLastCalledWith({ ...stockFilterDefaultState, code: "A" });
  })
  
  it("handle 'industry' for StockFilter correctly", () => {
    const wrapper = renderStockFilter(stockFilterDefaultState, sample_industry_options);
    const select = wrapper.getByTestId("industry-filter");
  
    fireEvent.change(select, { target: { value: "Information Technology" }});
    expect(setStockFilter).toHaveBeenLastCalledWith({ ...stockFilterDefaultState, industry: "Information Technology" });
  })
  
  it("reset values of StockFilter correctly", () => {
    const wrapper = renderStockFilter(stockFilterWithValidValues, sample_industry_options);
    const button = wrapper.getByTestId("clear-filter");
  
    fireEvent.click(button, { target: { value: "Information Technology" }});
    expect(setStockFilter).toHaveBeenLastCalledWith({ code: "", industry: "" });
  })

});




