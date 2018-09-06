const {equal, notEqual} = require('assert')
const {TrelloApi} = require('../../lib/trello/api')
const {TrelloConfig} = require('../../lib/trello/config')

test('TrelloApi', () => {
  test('#myBoards', () => {
    test('returns all boards with id and name', (done) => {
      TrelloApi().myBoards()
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

  test('#cardsOf', () => {
    let boardId = TrelloConfig().boardId

    test('returns all cards of a given board', (done) => {
      TrelloApi().cardsOf(boardId)
      .then((cards) => {
        cards.forEach((card) => {
          equal(typeof card, 'object')
          notEqual(typeof card.id, 'undefined')
          notEqual(typeof card.name, 'undefined')
        })

        done()
      }).catch(done)
    })

    test('returns the change-list actions within the card', (done) => {
      TrelloApi().cardsOf(boardId)
      .then((cards) => {
        cards.forEach((card) => {
          equal(typeof card.actions.length, 'number')
        })

        done()
      })
    .catch(done)
    })
  })
})
