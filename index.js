var executeRsync = require('./lib/execute-rsync')()

module.exports = function rsync() {

  var steps =
  { init: init
  , executeRsync: executeRsync
  }

  function getSteps() {
    return steps
  }

  function getStepList() {
    return Object.keys(steps)
  }

  function init(context, callback) {
    var data =
      { source: context.orderArgs[0]
      , destination: context.orderArgs[1]
      }

    callback(null, data)
  }

  return {
    getSteps: getSteps
  , getStepList: getStepList
  }

}
