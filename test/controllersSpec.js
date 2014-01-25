describe('controllers', function(){
    var _controllers;

    beforeEach(function(){
        _controllers = undefined;
        _controllers = require('../src/controllers');
    });

    describe('#subscribe()', function(){
        it('should return module controllers', function(){
            assert.equal(_controllers.subscribe('shouldReturn', function(){}), _controllers, 'it returns controllers');
        });
        it('should populate events', function(){
            _controllers.subscribe('shouldPopulate', function(){});
            assert.notEqual(_controllers.events, {}, 'there are events');
        });
    });

    describe('#publish()', function(){
        it('should return module controllers if event is found', function(){
            _controllers.subscribe('eventFound', function(){});
            assert.equal(_controllers.publish('eventFound'), _controllers, 'it returns controllers');
        });
        it('should return false if event is not found', function(){
            assert.equal(_controllers.publish('eventNotFound'), false, 'it returns false');
        });
        it('should fire the callback of a topic', function(){
            assert.throw(function() {
                _controllers.subscribe('shouldFireCallback', function(){
                    throw 'callback was called';
                });
                _controllers.publish('shouldFireCallback');
            }, 'callback was called');
        });
    });

    describe('#installTo()', function(){
        it('should install subscribe() and publish() onto an object', function(){
            var obj = {};

            _controllers.installTo(obj);

            assert.isDefined(_controllers.subscribe, 'subscribe is bound to object');
            assert.isDefined(_controllers.publish, 'publish is bound to object');
        });
    });
});