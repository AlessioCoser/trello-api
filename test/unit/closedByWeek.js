const { deepEqual } = require('assert')

test('ClosedByWeek', () => {
  test('returns empty array if no cards present', (done) => {
    let fakeCardsFor = cardsForWillReturn([])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    closedByWeek.get('boardId')
    .then((cards) => {
      deepEqual(cards, [])

      done()
    }).catch(done)
  })

  test('returns empty array if no card is closed', (done) => {
    let fakeCardsFor = cardsForWillReturn([card(1)])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    closedByWeek.get('boardId')
    .then((cards) => {
      deepEqual(cards, [])

      done()
    }).catch(done)
  })
})

const card = (id) => ({ id: `${id}`, name: 'first', actions: [] })
const cardsForWillReturn = (arg) => () => Promise.resolve(arg)

const ClosedByWeek = (cardsFor) => {
  return {
    get: (boardId) => cardsFor(boardId).then((cards) => cards.filter((card) => card.actions.length > 0))
  }
}
