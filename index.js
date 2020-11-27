const assert = require('nanoassert')

module.exports = function ExpiringInvertedPromise({timeoutMs, timeoutError, onTimeout}) {
    assert(onTimeout == null ? true : typeof onTimeout === 'function', 'onTimeout must be a function')
    assert(timeoutMs == null ? true : typeof timeoutMs === 'number', 'timeoutMs must be a number')
    var res
    var rej
    var timeoutHandle

    var p = new Promise((resolve, reject) => {
        res = resolve
        rej = reject
    })
    p.reject = rej
    p.resolve = res

    if (timeoutMs) {
        timeoutHandle = setTimeout(() => {
            if (onTimeout) onTimeout()
            p.reject(timeoutError)
        }, timeoutMs);
    }

    p.finally(() => clearTimeout(timeoutHandle))

    return p
  }
