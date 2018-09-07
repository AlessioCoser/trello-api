const { deepEqual } = require('assert')
const { promise } = require('../utils')

test('ClosedByWeek', () => {
  promise.test('returns empty array if no cards present', () => {
    let fakeCardsFor = () => Promise.resolve([])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    return promise.assert(closedByWeek.get('boardId'))
    .resolves((cards) => deepEqual(cards, []))
  })

  promise.test('returns empty array if no card is closed', () => {
    let fakeCardsFor = () => Promise.resolve([card(1)])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    return promise.assert(closedByWeek.get('boardId'))
    .resolves((cards) => deepEqual(cards, []))
  })

  promise.test('rejects with an error when cannot reach api', () => {
    let fakeCardsFor = () => Promise.reject(new Error('404 not found'))
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    return promise.assert(closedByWeek.get('boardId'))
    .rejects((err) => deepEqual(err.message, '404 not found'))
  })
})

const card = (id) => ({ id: `${id}`, name: 'first', actions: [] })

const ClosedByWeek = (cardsFor) => {
  return {
    get: (boardId) => cardsFor(boardId).then((cards) => cards.filter((card) => card.actions.length > 0))
  }
}
