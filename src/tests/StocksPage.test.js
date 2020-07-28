import React from "react";
import { shallow } from "enzyme";
import StocksPage from "../components/StocksPage";
import { sample_stocks, error_stocks_nosymbol, error_stocks_noindustry } from "./fixtures/stocks"
import { stockFilterDefaultState, stockFilterWithValidCode, stockFilterWithValidIndustry, stockFilterWithValidValues, stockFilterWihtInvaludCode } from "./fixtures/stockFilters"

const sample_industry_options = [ "Industrials", "Information Technology",  "Financials"]; 

describe("Test the filtering process in StocksPage component", () => {
 
  let visibleStock; 

  // Prepare the dummy function here as we cannot export setVisibleStock directly from StocksPage component
  const setVisibleStock = (allStocks, stockFilter) => {
    return allStocks.filter(stock => {
      const codeMatch = stock.symbol.toUpperCase().includes(stockFilter.code.toUpperCase());
      const industryMatch = stockFilter.industry ? stock.industry.match(stockFilter.industry) : true;
      
      return codeMatch && industryMatch; 
    });
  }

  it("should not filter when the filter values are not set", () => {
    visibleStock = setVisibleStock(sample_stocks, stockFilterDefaultState); 
    expect(visibleStock.length).toBe(sample_stocks.length);
  });
  
  it("should filter correctly with code", () => {
    visibleStock = setVisibleStock(sample_stocks, stockFilterWithValidCode); 
    expect(visibleStock.length).toBe(2);
  });
  
  it("should filter correctly with industry", () => {
    visibleStock = setVisibleStock(sample_stocks, stockFilterWithValidIndustry); 
    expect(visibleStock.length).toBe(2);
  });
  
  it("should filter correctly both with code and industry", () => {
    visibleStock = setVisibleStock(sample_stocks, stockFilterWithValidValues); 
    expect(visibleStock.length).toBe(1);
  });
  
  it("should return 0 records with invalid code", () => {
    visibleStock = setVisibleStock(sample_stocks, stockFilterWihtInvaludCode); 
    expect(visibleStock.length).toBe(0);
  });

  it("breaks the application program with TypeError when the code field is not set in stock data", () => {
    expect(() => {setVisibleStock(error_stocks_nosymbol, stockFilterWithValidValues)}).toThrow(TypeError);
  });
  
  it("breaks the application program with TypeError when the industry field is not set in stock data", () => {
    expect(() => {setVisibleStock(error_stocks_noindustry, stockFilterWithValidValues)}).toThrow(TypeError);
  });

}); 

// use shallow of enzyme instead of react-testing-library as ag-Grid doesn't work well with react-testing-library
describe("Test the rendering", () => {
  it("renders StockFilter with industryOptions props", () => {
    const wrapper = shallow(<StocksPage allStocks={sample_stocks} industryOptions={sample_industry_options}/>);
    expect(wrapper.find("StockFilter").prop("industryOptions")).toEqual(sample_industry_options);
  })
});

