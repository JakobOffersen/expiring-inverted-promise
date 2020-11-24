const assert = require('assert')

module.exports = function ExpiringInvertedPromise({timeoutMs, timeoutError, onTimeout}) {
    assert(onTimeout == null ? true : typeof onTimeout === 'function', 'onTimeout must be afunction')
    assert(timeoutMs == null ? true : typeof timeoutMs === 'number', 'timeoutMs must be a number')
    var res
    var rej
    var timeoutHandle

    var p = new Promise((resolve, reject) => {
        res = resolve
        rej = reject
    })

    if (timeoutMs) {
        timeoutHandle = setTimeout(() => {
            if (onTimeout) onTimeout()
            p.reject(timeoutError)
        }, timeoutMs);
    }

    p.resolve = (val) => {
        clearTimeout(timeoutHandle)
        return res(val)
    }

    p.reject = (err) => {
        clearTimeout(timeoutHandle)
        return rej(err)
    }

    return p
  }

