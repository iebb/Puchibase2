export function DataPagination(data, page, rowPerPage) {
  return data.slice(page * rowPerPage - rowPerPage, page * rowPerPage);
}

/**
 * @return {number}
 */
export function TotalPages(data, rowPerPage) {
  return Math.ceil(data.length / rowPerPage);
}

export function arrayToMap(arr, key) {
  const map = {};
  for(const row of arr) map[row[key]] = row;
  return map;
}

const popCount = [
  0,
  1,
  1, 2,
  1, 2, 2, 3,
  1, 2, 2, 3, 2, 3, 3, 4,
];
export function popBinaryMap(binMap) {
  return binMap.split("").map(x => popCount[parseInt(x, 16)]).reduce((x, y) => x + y);
}
