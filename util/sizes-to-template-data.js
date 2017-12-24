const womensSizes = [
  '6',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
  '12.5'
];
const mensSizes = [
  '4.5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
  '13'
];

const sizesToTemplateData = (sizes, options) => {
  const all = options.mens ? mensSizes : womensSizes;
  return all.map(size => {
    const isDisabled = sizes.indexOf(size) === -1;
    const isSelected = size === options.selected;
    return { size, isDisabled, isSelected };
  });
};

module.exports = {
  sizesToTemplateData
};
