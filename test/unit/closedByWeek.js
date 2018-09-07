const { deepEqual } = require('assert')

test('ClosedByWeek', () => {
  test('returns empty array if no cards present', (done) => {
    let fakeCardsFor = () => Promise.resolve([])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    closedByWeek.get('boardId')
    .then((cards) => {
      deepEqual(cards, [])

      done()
    }).catch(done)
  })
})

const ClosedByWeek = (cardsFor) => {
  return {
    get: (boardId) => cardsFor(boardId)
  }
}
