import React, { useState, useEffect } from "react";
import StockFilter from "./StockFilter";
import StockList from "./StockList";
import MyContext from "../utils/MyContext";

function StocksPage({ allStocks, exchangeOptions }) {

  const [visibleStocks, setVisibleStocks] = useState(allStocks);
  const [stockFilter, setStockFilter] = useState({ name: "", exchange: "" });
  const [startFromThisPage, setstartFromThisPage] = useState(false);

  useEffect(() => {
    if (visibleStocks.length === 0) {
      console.log("User directly access this page, or press reload button.")
      setstartFromThisPage(true);
    }
  }, []);

  useEffect(()=> {
    setVisibleStocks(() => {
      return allStocks.filter(stock => {
        const nameMatch = stock.name.toUpperCase().includes(stockFilter.name.toUpperCase());
        const exchangeMatch = stockFilter.exchange ? stock.exchange.match(stockFilter.exchange) : true;
        return nameMatch && exchangeMatch; 
      });
    });
  }, [allStocks, stockFilter])

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Company List</h1>
          <p className="page-header__text">Click stock code to view their latest 100 days of activities</p>
        </div>
      </div>
      <div>
        <MyContext.Provider value={[stockFilter, setStockFilter]}>
        <StockFilter exchangeOptions={exchangeOptions}/> 
        </MyContext.Provider>
        <StockList stocks={startFromThisPage? allStocks : visibleStocks}/>
      </div>
    </div>
  );
}

export default StocksPage;