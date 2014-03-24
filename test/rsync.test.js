var should = require('should')
  , assert = require('assert')
  , rsync = require('../index')()

describe('rsync', function () {

  it('should return steps', function () {
    var steps = rsync.getSteps()
    assert.equal(typeof steps.init, 'function')
    assert.equal(typeof steps.executeRsync, 'function')
  })

  it('should return steps list', function () {
    var stepList = rsync.getStepList()
    stepList.length.should.equal(2)
    stepList[0].should.equal('init')
    stepList[1].should.equal('executeRsync')
  })

  it('should run the init function', function (done) {
    var steps = rsync.getSteps()
      , context =
        { orderArgs: [ 'source', 'destination' ]
        }

    steps.init(context, function (error, data) {
      should.not.exist(error)
      Object.keys(data).length.should.equal(2)
      data.source.should.equal(context.orderArgs[0])
      data.destination.should.equal(context.orderArgs[1])
      done()
    })
  })

})
