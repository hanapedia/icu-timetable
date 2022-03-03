// should be used as percentage value
const cellHeights = {
  default: 6.667,
  eigth: 5.882,
};
// should be used as percentage value
const cellWidths = {
  defualt: 20,
  sat: 16.67,
};

const getUnits = (sat: boolean, eigth: boolean) => {
  return {
    xUnit: sat ? cellWidths.sat : cellWidths.defualt,
    yUnit: eigth ? cellHeights.eigth : cellHeights.default,
  };
};

export { cellHeights, cellWidths, getUnits };
