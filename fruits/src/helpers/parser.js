const jp = require('jsonpath');

export default function parseDataSet(hash) {
  return jp.query(hash, '$..*[?(@.isFruit)]').filter((elem) => elem.name);
}
