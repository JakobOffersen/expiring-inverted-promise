const ExpiringInvertedPromise = require('./index')

const ontimeout = () => {
    console.log("timed out") // called on rejection by timeout only
}

const p1 = new ExpiringInvertedPromise({timeoutMs: 3000,
                                        timeoutError: new Error("timeout error"),
                                        onTimeout: ontimeout})

const p2 = new ExpiringInvertedPromise({timeoutMs: 1000,
                                        timeoutError: new Error("timeout error"),
                                        onTimeout: ontimeout})

p1.then((value) => {
    console.log(value) // "p1 is resolved"
})

p2.catch((err) => {
    console.log(err) // Timeout Error
})

setTimeout(() => {
    p1.resolve("p1 is resolved")
    p2.resolve("p2 is rejected after 1s, meaning it won't be resolved")
}, 2000)
