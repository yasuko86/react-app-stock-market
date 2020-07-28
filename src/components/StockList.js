import React from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

function StockList({ stocks }) {

  const cellStyle = {
    color: '#333333',
    'font-size': "1.6rem",
  }
 
  const columns = [
    { 
      headerName: "Code", 
      field: "symbol",
      cellRendererFramework: (params) => {
        return <Link className="grid-item" to={{ pathname: `/history/${params.value}`, name: params.data.name }}>{params.value}</Link>
      },
      sortable: true,
      flex: true,
      maxWidth: 200,
      minWidth: 120,
      cellStyle
    },
    {
      headerName: "Company Name",
      field: "name",
      sortable: true,
      flex: true,
      minWidth: 480,
      cellStyle
    },
    { 
      headerName: "Exchange", 
      field: "exchange",
      sortable: true,
      flex: true,
      maxWidth: 300,
      minWidth: 200,
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
            rowData={stocks}
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

export default StockList;