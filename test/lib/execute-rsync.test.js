var fs = require('fs')
  , sinon = require('sinon')
  , should = require('should')
  , rmdir = require('rmdir')
  , executeRsync = require('../../lib/execute-rsync')()

describe('execute-rsync', function () {

  before(function (done) {
    fs.mkdir('/tmp/navy-rsync-test', function () {
      fs.writeFile('/tmp/navy-rsync-test/test', 'hello', function () {
        done()
      })
    })
  })

  it('should rsync data correctly', function (done) {
    var emitSpy = sinon.spy()
      , context = { emit: emitSpy }
      , data =
        { source: '/tmp/navy-rsync-test'
        , destination: '/tmp/navy-rsync-test2'
        }

    executeRsync(context, data, function (error) {
      should.not.exist(error)
      fs.exists('/tmp/navy-rsync-test2/navy-rsync-test/test', function (fileExists) {
        fileExists.should.equal(true)
        emitSpy.callCount.should.be.above(1)
        done()
      })
    })
  })

  it('should output errors when rsync fails', function (done) {
    var emitSpy = sinon.spy()
      , context = { emit: emitSpy }
      , data =
        { source: '/tmp/dadasdsa'
        , destination: '/tmp/asddasdas'
        }

    executeRsync(context, data, function (error) {
      should.exist(error)
      done()
    })
  })

  after(function (done) {
    rmdir('/tmp/navy-rsync-test', function () {
      rmdir('/tmp/navy-rsync-test2', function () {
        done()
      })
    })
  })

})
