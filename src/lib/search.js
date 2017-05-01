const resolve = (token, label) => {
  let streets = token.split(' ').filter(w => w != 'and');
  const intersection = require('lodash/intersection');

  return (intersection(streets, label.split(' ')).length > 1);
};

export default resolve;
