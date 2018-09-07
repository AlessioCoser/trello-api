const { equal, notEqual } = require('assert')
const { promise } = require('../utils')

test('trello', () => {
  test('#myBoards', () => {
    const { myBoards } = require('../../lib/trello')

    promise.test('returns all boards with id and name', () => {
      return promise.assert(myBoards())
      .resolves((boards) => {
        boards.forEach((board) => {
          equal(typeof board, 'object')
          notEqual(typeof board.id, 'undefined')
          notEqual(typeof board.name, 'undefined')
        })
      })
    })
  })

  test('#cardsFor', () => {
    const { cardsFor } = require('../../lib/trello')
    const { configuration } = require('../../lib/trello/configuration')
    let boardId = configuration().boardId

    promise.test('returns all cards of a given board', () => {
      return promise.assert(cardsFor(boardId))
      .resolves((cards) => {
        cards.forEach((card) => {
          equal(typeof card, 'object')
          notEqual(typeof card.id, 'undefined')
          notEqual(typeof card.name, 'undefined')
        })
      })
    })

    promise.test('returns the change-list actions within the card', () => {
      return promise.assert(cardsFor(boardId))
      .resolves((cards) => {
        cards.forEach((card) => {
          equal(typeof card.actions.length, 'number')
        })
      })
    })
  })
})
