const {equal, notEqual} = require('assert')
const {TrelloApi, TrelloConfig} = require('../../lib/Trello')

test('TrelloApi', () => {
  test('#myBoards list all boards with id and name', (done) => {
    let trelloApi = TrelloApi(TrelloConfig())

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
