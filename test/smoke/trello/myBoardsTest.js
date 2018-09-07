const { equal, notEqual } = require('assert')
const { myBoards } = require('../../../lib/trello')

test('trello', () => {
  test('#myBoards', () => {
    test('returns all boards with id and name', (done) => {
      myBoards()
      .then((boards) => {
        boards.forEach((board) => {
          equal(typeof board, 'object')
          notEqual(typeof board.id, 'undefined')
          notEqual(typeof board.name, 'undefined')
        })

        done()
      }).catch(done)
    })
  })
})
