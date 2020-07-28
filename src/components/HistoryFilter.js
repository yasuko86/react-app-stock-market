import React, { useState, useContext } from "react";
import { DateRangePicker } from 'react-dates';
import MyContext from "../utils/MyContext";

function HistoryFilter() {
  
  const [historyFilter, setHistoryFilter] = useContext(MyContext);
  const [calendarFocused, setFocus] = useState();

  return (
    <div className="content-container">
      <div className="input-group">
        <div className="input-group__item input-group__item--label">
          <label className="label">Filter by Date:</label>
        </div>
        <div className="input-group__item"> 
          <DateRangePicker 
            startDate={historyFilter.startDate}
            startDateId={"start"}
            endDate={historyFilter.endDate}
            endDateId={"end"}
            onDatesChange={({ startDate, endDate }) => {
              setHistoryFilter({ startDate, endDate });
            }}
            focusedInput={calendarFocused}
            onFocusChange={(calendarFocused) => setFocus(calendarFocused)}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={()=>false}
          />
        </div>
      </div>
    </div>
  );
}

export default HistoryFilter;