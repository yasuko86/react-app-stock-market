const sample_stocks = [
  { symbol: "AAL", name: "American Airlines Group", industry: "Industrials" },
  { symbol: "ADBE", name: "Adobe Systems Inc", industry: "Information Technology" },
  { symbol: "BBT", name: "BB&T Corporation", industry: "Financials" }, 
  { symbol: "CTXS", name: "Citrix Systems", industry: "Information Technology" },
  { symbol: "L", name: "Loews Corp.", industry: "Financials" },
];

// Invalid api data with empty
const empty_stocks = []; 

// Invalid api data with a wrong key
const error_stocks_wrong_field = [
  { code: "AAL", name: "American Airlines Group", industry: "Industrials" },
  { code: "ADBE", name: "Adobe Systems Inc", industry: "Information Technology" },
  { code: "BBT", name: "BB&T Corporation", industry: "Financials" }, 
  { code: "CTXS", name: "Citrix Systems", industry: "Information Technology" },
  { code: "L", name: "Loews Corp.", industry: "Financials" },
];

// Invalid value with a wrong key
const error_stocks_nosymbol = [
  { name: "American Airlines Group", industry: "Industrials" },
  { name: "Adobe Systems Inc", industry: "Information Technology" },
  { name: "BB&T Corporation", industry: "Financials" }, 
  { name: "Citrix Systems", industry: "Information Technology" },
  { name: "Loews Corp.", industry: "Financials" },
];

const error_stocks_noindustry = [
  { symbol: "AAL", name: "American Airlines Group" },
  { symbol: "BBT", name: "BB&T Corporation" }, 
  { symbol: "CTXS", name: "Citrix Systems" },
  { symbol: "CTXS", name: "Citrix Systems" },
  { symbol: "L", name: "Loews Corp." },
];



export { sample_stocks, error_stocks_wrong_field, empty_stocks, error_stocks_nosymbol, error_stocks_noindustry }; 

