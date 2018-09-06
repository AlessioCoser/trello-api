const {equal, notEqual} = require('assert')
const {TrelloApi} = require('../../lib/trello/api')

test('TrelloApi', () => {
  test('#myBoards', () => {
    test('returns all boards with id and name', (done) => {
      let trelloApi = TrelloApi()

      trelloApi.myBoards()
      .then((boards) => {
        boards.forEach((board) => {
          equal(typeof board, 'object')
          notEqual(typeof board.id, 'undefined')
          notEqual(typeof board.name, 'undefined')
        })

        done()
      })
      .catch(done)
    })
  })
})
