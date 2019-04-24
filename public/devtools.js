const path = require("path");

const { CHROME_EXTENSIONS_PATH, REACT_DEVTOOLS, REDUX_DEVTOOLS } = process.env;
const devtools = [REACT_DEVTOOLS, REDUX_DEVTOOLS].filter(x => x);

module.exports = devtools.map(devtool =>
  path.join(CHROME_EXTENSIONS_PATH, devtool)
);
