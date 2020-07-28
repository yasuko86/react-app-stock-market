import moment from "moment";
import { getAllStockListFromApi } from "../components/App";
import { error_stocks_wrong_field, empty_stocks } from "./fixtures/stocks";
import { getHistoryFromApi } from "../components/HistoryPage";
import { empty_history, invalid_history_notimestamp }  from "./fixtures/history";

// To check that even when the application access the API successfully but the API doesn't have a correct data,
// the application will try to work with invalid data

describe("Test the case where the API stock data is different what we expect", () => {

  it('fetch data that does not have expected field', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true, 
          Id: '123', 
          json: function() { 
            return error_stocks_wrong_field
          }
        });
      });
  
      return p;
    });
    const res = await getAllStockListFromApi();
    // data has "code" field instead of "symbol" field
    expect(res.length).toBe(error_stocks_wrong_field.length); 
    expect(res.length).toBe(5);
    expect(res[0].symbol).toEqual(undefined); 
    global.fetch.mockRestore();
  });

  it('fetch empty data', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true, 
          Id: '123', 
          json: function() { 
            return empty_stocks
          }
        });
      });
  
      return p;
    });
    const res = await getAllStockListFromApi();
    expect(res.length).toBe(0);
    global.fetch.mockRestore();
  }); 
});

describe("Test the case where the API price history data is different what we expect", () => {

  it('fetch data that does not have expected field', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true, 
          Id: '123', 
          json: function() { 
            return invalid_history_notimestamp
          }
        });
      });
  
      return p;
    });
    const res = await getHistoryFromApi();
    // data doesn't have timestamp field
    expect(res.length).toBe(invalid_history_notimestamp.length); 
    expect(res.length).toBe(3);
    expect(res[0].timestamp.format("DD/MM/YY")).toEqual(moment(undefined).format("DD/MM/YY")); 
    global.fetch.mockRestore();
  });

  it('fetch empty data', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true, 
          Id: '123', 
          json: function() { 
            return empty_history
          }
        });
      });
  
      return p;
    });
    const res = await getHistoryFromApi();
    expect(res.length).toBe(0);
    global.fetch.mockRestore();
  }); 

});