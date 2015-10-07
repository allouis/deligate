var test = require('tape')
var deligate = require('../')

test('it exports a function', function(t){
    t.equals(typeof deligate, 'function', 'typeof deligate is equal to function')
    t.end()
})

test('it requires a first argument of type string', function(t){

    t.throws(function(){
        deligate()
    }, 'deligate throws when called with no args')

    t.doesNotThrow(function(){
        deligate('.selector', function(){})
    }, 'deligate does not throw when passed a string as first arg and function as second')

    t.throws(function(){
        deligate(/not_a_string/, function(){})
    }, 'deligate throws when passed a first arg that is not a function')

    t.end()
})

test('it requires a second argument of type function', function(t){

    t.throws(function(){
        deligate('.selector')
    }, 'deligate throws when missing second arg')

    t.doesNotThrow(function(){
        deligate('.selector', function(){})
    }, 'deligate does not throw when passed a function as second arg')

    t.throws(function(){
        deligate('.selector', 'something')
    }, 'deligate throws when passed second arg that is not a function')

    t.end()
})

test('it returns a function', function(t){
    var handler = deligate('.selector', function(){})
    t.equals(typeof handler, 'function', 'return value of deligate is a function')
    t.end()
})


test('the returned function', function(t){

    var fakeEvent = {
        target: {
            matches: function(selector){
                return selector === '.selector'
            }
        }
    }

    t.test('expects an event argument', function(t){
        var handler = deligate('.selector', function(){})

        t.throws(function(){
            handler()
        }, 'returned fn throws when called with no args')

        t.doesNotThrow(function(){
            handler(fakeEvent)
        }, 'returned fn does not throw when called with an event')

        t.end()
    })

    t.test('it calls the handler fn if selector matches the event.target', function(t){
        var called = false
        var handler = deligate('.selector', function(){ called = true })

        handler(fakeEvent)
        t.equals(called, true, 'the handler fn is called')

        t.end()
    })

    t.test('it does not call the handler fn if selector does not matche the event.target', function(t){
        var called = false
        var handler = deligate('.incorrect', function(){ called = true })

        handler(fakeEvent)
        t.equals(called, false, 'the handler fn is not called')

        t.end()
    })

    t.test('it calls the handler fn with the same context it is called with', function(t){
        var context = {}
        var handler = deligate('.selector', function(){
            t.equals(context, this, 'context of handler fn is same as returned fn')
            t.end()
        })
        handler.call(context, fakeEvent)
    })

    t.end()

})
