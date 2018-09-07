const { deepEqual } = require('assert')

test('ClosedByWeek', () => {
  test('returns empty array if no cards present', (done) => {
    let fakeCardsFor = promiseWillResolve([])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    closedByWeek.get('boardId')
    .then((cards) => {
      deepEqual(cards, [])
    })
    .then(done).catch(done)
  })

  test('returns empty array if no card is closed', (done) => {
    let fakeCardsFor = promiseWillResolve([card(1)])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    closedByWeek.get('boardId')
    .then((cards) => {
      deepEqual(cards, [])
    })
    .then(done).catch(done)
  })

  test('rejects with an error when call to trello is broken', (done) => {
    let fakeCardsFor = promiseWillReject(new Error('404 not found'))
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    expects(closedByWeek.get('boardId'))
    .willRejectWith((err) => deepEqual(err.message, '404 not found'))
    .then(done).catch(done)
  })
})

const expects = (promise) => {
  return {
    willRejectWith: (expression) => {
      return new Promise((resolve, reject) => {
        promise
        .then(() => {
          reject(new Error('a promise rejection expected, resolved instead'))
        })
        .catch((error) => {
          expression(error)
        })
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
    get: (boardId) => cardsFor(boardId).then((cards) => cards.filter((card) => card.actions.length > 0)).catch(() => [])
  }
}
