const stockFilterDefaultState = {
  code: "",
  industry: "",
};

const stockFilterWithValidCode= {
  code: "A",
  industry: "",
};

const stockFilterWithValidIndustry = {
  code: "",
  industry: "Information Technology",
};

const stockFilterWithValidValues = {
  code: "A",
  industry: "Information Technology",
};

const stockFilterWihtInvaludCode = {
  code: "@",
  industry: "",
};

export { stockFilterDefaultState, stockFilterWithValidCode, stockFilterWithValidIndustry, stockFilterWithValidValues, stockFilterWihtInvaludCode };