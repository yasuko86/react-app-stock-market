import React, { useState, useEffect } from "react";
import history from "../utils/history";
import moment from "moment";

import HistoryFilter from "./HistoryFilter";
import MyContext from "../utils/MyContext";
import HistoryList from "./HistoryList";
import HistoryGraph from "./HistoryGraph";
import Loading from "./Loading";
import { handleErrors } from "./App"

export function getHistoryFromApi(api) {
  console.log("Hit the server! (selected history)");
  return fetch(api)
    .catch(() => { throw new Error("NETWORK_ERROR") })
    .then(handleErrors)
    .then(res => res.json())
    .then(data => {    
      return data.map(x => {
        return {
          timestamp: moment(x.date), 
          open: x.open, 
          high: x.high, 
          low: x.low, 
          close: x.close, 
          volume: x.volume
        };
      });
    });
}

function HistoryPage({ location, match }) {

  const API_KEY = process.env.REACT_APP_IEX_API_KEY;
  const api = `https://cloud.iexapis.com/stable/stock/${match.params.code}/chart/3m?token=${API_KEY}`;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allHistory, setAllHistory] = useState([]);
  const [visibleHistory, setVisibleHistory] = useState([]);
  const [historyFilter, setHistoryFilter] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    getHistoryFromApi(api)
      .then(defaultHistory => {
        setAllHistory(defaultHistory);
        setVisibleHistory(defaultHistory);
        setLoading(false);
      })
      .catch(e => {
        console.log(e.message);
        setError(e);
        setLoading(false);
      })
  }, []);

  useEffect(()=> {
    setVisibleHistory(() => {
      return allHistory.filter(day => {
        const startDateMatch = historyFilter.startDate ? historyFilter.startDate.isSameOrBefore(day.timestamp, 'day') : true;
        const endDateMatch = historyFilter.endDate ? historyFilter.endDate.isSameOrAfter(day.timestamp, 'day') : true;
        
        return startDateMatch && endDateMatch; 
      });
    });
  }, [allHistory, historyFilter])

  if (loading) {
    return <div><Loading /></div> ;
  }

  if (error) {
    history.push({ pathname: "/error", error });
  }

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Price History</h1>
          <p className="page-header__text">Showing stocks for <span>{location.name}</span></p>
        </div>
      </div>
      <div>
        <MyContext.Provider value={[historyFilter, setHistoryFilter]}>
          <HistoryFilter />
        </MyContext.Provider>
        <HistoryList history={visibleHistory}/>
        {
          visibleHistory.length === 0? (
            <div className="content-container">
              <p style={{ textAlign: "center" }}>No Data to Show</p>
            </div>
          ) : (
            <HistoryGraph history={visibleHistory}/>
          ) 
        }
        
      </div>
    </div>
  );
}

export default HistoryPage;