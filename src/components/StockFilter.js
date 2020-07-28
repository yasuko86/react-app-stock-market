import React, { useContext } from "react";
import MyContext from "../utils/MyContext";

function StockFilter({ exchangeOptions }) {

  const [stockFilter, setStockFilter] = useContext(MyContext);

  return(
    <div className="content-container" >
      <div className="input-group">
        <div className="input-group__item">
          <input 
            type="text"
            data-testid="code-filter"
            className="text-input"
            placeholder="Search by Company"
            value={stockFilter.name}
            onChange={e => {
              setStockFilter({ ...stockFilter, name: e.target.value})
            }}
          />
        </div>
        <div className="input-group__item input-group__item--label">
          <label className="label">Exchange:</label>
        </div>
        <div className="input-group__item">
          <select
            className="select"
            data-testid="exchange-filter"
            value={stockFilter.exchange}
            onChange={e => {
              setStockFilter({...stockFilter, exchange: e.target.value})
            }}
          >
            <option data-testid="exchange-options" value="">All</option>
            {exchangeOptions.map(exchange => {
              return (<option data-testid="exchange-options" value={exchange} key={exchange}>{exchange}</option>);
            })}
          </select>
        </div>
        <div className="input-group__item">
          <button 
            className="button button--action"
            data-testid="clear-filter"
            onClick={() => {
              setStockFilter({ name: "", echange: "" })
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockFilter;