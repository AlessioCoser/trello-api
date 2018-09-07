const { deepEqual } = require('assert')

test('ClosedByWeek', () => {
  test('returns empty array if no cards present', (done) => {
    let fakeCardsFor = promiseWillResolve([])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    verify(closedByWeek.get('boardId'))
    .willResolve((cards) => deepEqual(cards, []))
    .then(done).catch(done)
  })

  test('returns empty array if no card is closed', (done) => {
    let fakeCardsFor = promiseWillResolve([card(1)])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    verify(closedByWeek.get('boardId'))
    .willResolve((cards) => deepEqual(cards, []))
    .then(done).catch(done)
  })

  test('rejects with an error when call to trello is broken', (done) => {
    let fakeCardsFor = promiseWillReject(new Error('404 not found'))
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    verify(closedByWeek.get('boardId'))
    .willReject((err) => deepEqual(err.message, '404 not found'))
    .then(done).catch(done)
  })
})

const verify = (promise) => {
  return {
    willReject: (expression = () => null) => {
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
    willResolve: (expression = () => null) => {
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

const card = (id) => ({ id: `${id}`, name: 'first', actions: [] })
const promiseWillResolve = (arg) => () => Promise.resolve(arg)
const promiseWillReject = (err) => () => Promise.reject(err)

const ClosedByWeek = (cardsFor) => {
  return {
    get: (boardId) => cardsFor(boardId).then((cards) => cards.filter((card) => card.actions.length > 0))
  }
}
