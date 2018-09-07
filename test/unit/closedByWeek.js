const { deepEqual } = require('assert')
const { assertPromise } = require('../utils')

test('ClosedByWeek', () => {
  test('returns empty array if no cards present', (done) => {
    let fakeCardsFor = () => Promise.resolve([])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    assertPromise(closedByWeek.get('boardId'))
    .resolves((cards) => deepEqual(cards, []))
    .then(done).catch(done)
  })

  test('returns empty array if no card is closed', (done) => {
    let fakeCardsFor = () => Promise.resolve([card(1)])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    assertPromise(closedByWeek.get('boardId'))
    .resolves((cards) => deepEqual(cards, []))
    .then(done).catch(done)
  })

  test('rejects with an error when call to trello is broken', (done) => {
    let fakeCardsFor = () => Promise.reject(new Error('404 not found'))
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    assertPromise(closedByWeek.get('boardId'))
    .rejects((err) => deepEqual(err.message, '404 not found'))
    .then(done).catch(done)
  })
})

const card = (id) => ({ id: `${id}`, name: 'first', actions: [] })

const ClosedByWeek = (cardsFor) => {
  return {
    get: (boardId) => cardsFor(boardId).then((cards) => cards.filter((card) => card.actions.length > 0))
  }
}
