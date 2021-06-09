module.exports = function (options = {}) {
  return context => {
    if ((options.allowAnonymous || !context.params.anonymous) && context.params.query.$limit === '-1') {
      context.params.paginate = false
      delete context.params.query.$limit
    }
    return context
  }
}
