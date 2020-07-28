import React from "react";
import { AgGridReact } from "ag-grid-react";

function HistoryList({ history })   {

  const cellStyle = {
    color: '#333333',
  }

  const minWidth = 115;

  const columns = [
    { 
      headerName: "Date", 
      field: "timestamp",
      sortable: true,
      flex: 1,
      valueFormatter: (params) => {
        return params.value.format("DD/MM/YYYY");
      },
      minWidth,
      cellStyle
    },
    {
      headerName: "Open",
      field: "open",
      flex: 1,
      minWidth,
      cellStyle
    },
    { 
      headerName: "High", 
      field: "high",
      flex: 1,
      minWidth,
      cellStyle
    },
    { 
      headerName: "Low", 
      field: "low",
      flex: 1,
      minWidth,
      cellStyle
    },
    { 
      headerName: "Close", 
      field: "close",
      flex: 1,
      minWidth,
      cellStyle
    },
    { 
      headerName: "Volume", 
      field: "volume",
      flex: 1,
      minWidth,
      valueFormatter: (params) => {
        return params.value.toLocaleString();
      },
      cellStyle
    },
  ];

  return (
    <div className="content-container">
      <div className="content-container__grid">
        <div
          className="ag-theme-alpine"
          style={{
            width: "100%"
          }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={history.slice().reverse()}
            pagination={true}
            paginationPageSize={20}
            headerHeight={50}
            domLayout={"autoHeight"}
          />
        </div>
      </div>
    </div>
  );
}

export default HistoryList;