import { getAllStockListFromApi } from "../components/App";
import { getHistoryFromApi } from "../components/HistoryPage";

// Test if getAllStockListFromApi retrun correct response according to the response of fetch
describe("Test stock data fetching", () => {
  const correct_api = "http://131.181.190.87:3001/all";
  const non_exist_api = "http://131.181.190.87:300";  // non-existing page
  const error_api = "http://131.181.190.87:3001/industry"; // cause error page

  it('fetch data correctly', async () => {
    const res = await getAllStockListFromApi(correct_api).then(stocks => stocks);
    expect(res.length).toBe(495); 
  });
  
  it('catch error correctly when the server access error occurs', async () => {
    const message = "NETWORK_ERROR";
    const res = await getAllStockListFromApi(non_exist_api).catch(e => { return e.message });
    expect(res).toBe(message); 
  });
  
  it('catch error correctly from the api returning an error', async () => {
    const message = "INVALID_TOKEN";
    const res = await getAllStockListFromApi(error_api).catch(e => { return e.message });
    expect(res).toBe(message); 
  });
});

// Test if getHistoryFromApi retrun correct response according to the response of fetch
describe("Test price history data fetching", () => {
  const correct_api = `http://131.181.190.87:3001/history?symbol=AAL`;
  const non_exist_api = `http://131.181.190.87:300/history?symbol=AAL`; // non-existing page
  const error_api = `http://131.181.190.87:3001/history?symbol=ZZZ`; // cause error page

  it('fetch data correctly', async () => {
    const res = await getHistoryFromApi(correct_api).then(stocks => stocks);
    expect(res.length).toBe(100); 
  });
  
  it('catch error correctly when the server access error occurs', async () => {
    const message = "NETWORK_ERROR";
    const res = await getHistoryFromApi(non_exist_api).catch(e => { return e.message });
    expect(res).toBe(message); 
  });
  
  it('catch error correctly from the api returning an error', async () => {
    const message = "INVALID_TOKEN";
    const res = await getHistoryFromApi(error_api).catch(e => { return e.message });
    expect(res).toBe(message); 
  });
});