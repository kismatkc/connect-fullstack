const keyword = "College";
const string =
  "Centennial College, 75 Ashtonbee Rd, Scarborough, Ontario M1L 4C9, Canada";
function truncuateTillKeyword(string, keyword) {
  if (!(string || keyword)) return null;
  const desiredStringLength = string.indexOf(keyword) + keyword.length;
  const desiredString = string.slice(0, desiredStringLength);
  return desiredString;
}

console.log(truncuateTillKeyword(string, keyword));
