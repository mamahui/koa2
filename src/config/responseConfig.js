const success = data => {
  return {
    code: '0000',
    message: 'success',
    content: data
  }
};
const fail = data => {
  return {
    code: '9999',
    message: 'error',
    data: data
  }
};

module.exports = {
  success,
  fail
};