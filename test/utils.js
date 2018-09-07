exports.assertPromise = (promise) => {
  return {
    rejects: (expression = () => null) => {
      return new Promise((resolve, reject) => {
        promise
        .then(() => {
          reject(new Error('a promise rejection expected, resolved instead'))
        })
        .catch(expression)
        .then(resolve)
        .catch(reject)
      })
    },
    resolves: (expression = () => null) => {
      return new Promise((resolve, reject) => {
        promise
        .catch((error) => {
          reject(new Error(`a promise resolution expected, rejected with ${error} instead`))
        })
        .then(expression)
        .then(resolve)
        .catch(reject)
      })
    }
  }
}

exports.testPromise = (testName, testMethod) => {
  test(testName, (done) => {
    let testResult = testMethod(done)

    if (Promise.resolve(testResult) === testResult) {
      testResult.then(done).catch(done)
    } else {
      done(new Error('No promise to assert'))
    }
  })
}

exports.promise = {
  test: exports.testPromise,
  assert: exports.assertPromise
}
