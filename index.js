var selector_error = 'deligate must be passed a string for the selector'
var handler_error = 'deligate must be passed a function for the handler'

function deligate(selector, handler) {
    if (typeof selector != 'string') throw new Error(selector_error)
    if (typeof handler != 'function') throw new Error(handler_error)
    return function deligated(event) {
        if (event.target.matches(selector)) {
            return handler(event)
        }
    }
}

module.exports = exports = deligate
