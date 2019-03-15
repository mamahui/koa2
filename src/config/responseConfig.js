const success = data => {
  return {
    code: '0000',
    status: 'success',
    content: data
  }
};
const fail = data => {
  return {
    code: '9999',
    status: 'error',
    content: data
  }
};

module.exports = {
  success,
  fail
};