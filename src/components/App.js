import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../utils/history";

import Header from "./Header";
import LandingPage from "./LandingPage";
import NotFoundPage from "./NotFoundPage";
import StocksPage from "./StocksPage";
import HistoryPage from "./HistoryPage";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import ScrollToTop from '../utils/ScrollToTop';

import "../styles/styles.scss";

export function handleErrors(res) {
  if (res.ok) {
    return res;
  }
  switch (res.status) {
    case 400: throw Error("INVALID_TOKEN");
    case 401: throw Error("UNAUTHORIZED");
    case 500: throw Error("INTERNAL_SERVER_ERROR");
    case 402: throw Error("BAD_GATEWAY");
    case 404: throw Error("NOT_FOUND");
    default: throw Error("UNHANDLED_ERROR");
  }
}

export function getAllStockListFromApi(api) {
  console.log("Hit the server! (stock info)");
  return fetch(api)
    .catch(() => { throw new Error("NETWORK_ERROR") })
    .then(handleErrors)
    .then(res => res.json())
    .then(data => {
      return data.filter(x => x.region==="US" && x.type === "cs" && x.currency === "USD" && x.isEnabled).map(x => {
        return {
          symbol: x.symbol,
          name: x.name,
          exchange: x.exchange,
        };
      });
    });
}

const API_KEY = process.env.REACT_APP_IEX_API_KEY;
const api = `https://cloud.iexapis.com/stable/ref-data/symbols?&token=${API_KEY}`

export default function App(props) {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allStocks, setAllStocks] = useState({ stocks: [], exchanges: [] });

  useEffect(() => {   
    getAllStockListFromApi(api)
      .then(defaultStocks => {
        setAllStocks({
          stocks: defaultStocks,
          exchanges: [...new Set(defaultStocks.map(stock => stock.exchange))]
        });
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError(e);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <div><Loading /></div> ;
  }

  if (error) {
    history.push({ pathname: "/error", error });
  }

  return (
    <div className="App">
      <Router history={history}>
        <ScrollToTop />
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route 
              exact path="/stocks" 
              render={()=> {
                return (
                  <StocksPage allStocks={allStocks.stocks} exchangeOptions={allStocks.exchanges}/>
                );
              }} 
            />
            <Route path="/history/:code" component={HistoryPage} />
            <Route path="/error" component={ErrorPage}/>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
