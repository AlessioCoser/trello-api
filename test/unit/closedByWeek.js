const {deepEqual} = require('assert')

test('ClosedByWeek', () => {
  test('returns empty array if no cards present', (done) => {
    let trelloFakeApi = {cardsOf: () => Promise.resolve([])}
    let closedByWeek = ClosedByWeek(trelloFakeApi)

    closedByWeek.get('boardId')
    .then((cards) => {
      deepEqual(cards, [])

      done()
    }).catch(done)
  })
})

const ClosedByWeek = (trelloApi) => {
  return {
    get: (boardId) => trelloApi.cardsOf(boardId)
  }
}
