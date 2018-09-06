const {deepEqual} = require('assert')
const {TrelloApi} = require('../../lib/trello/api')

test('ClosedByWeek', () => {
  test('returns empty array if no cards present', (done) => {
    trelloFakeApi = {cardsOf: () => Promise.resolve([])}
    closedByWeek = ClosedByWeek(trelloFakeApi)

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
