var Rsync = require('rsync')

module.exports = function createExecuteRsync() {

  function executeRsync(context, data, callback) {
    var rsync = new Rsync()
      .shell('ssh')
      .flags('lcav')
      .source(data.source)
      .destination(data.destination)

    function emitWrapper(rsyncData) {
      context.emit(rsyncData.toString())
    }

    rsync.execute(
      function(error, code, cmd) {
        if (!error && code === 0) {
          context.emit('Successfully executed: ' + cmd)
        }
        callback(error, data)
      }
    , emitWrapper
    , emitWrapper
    )
  }

  return executeRsync
}
