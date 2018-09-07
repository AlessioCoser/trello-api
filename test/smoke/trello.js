const { equal, notEqual } = require('assert')
const { assertPromise } = require('../utils')

test('trello', () => {
  test('#myBoards', () => {
    const { myBoards } = require('../../lib/trello')

    test('returns all boards with id and name', (done) => {
      assertPromise(myBoards()).resolves((boards) => {
        boards.forEach((board) => {
          equal(typeof board, 'object')
          notEqual(typeof board.id, 'undefined')
          notEqual(typeof board.name, 'undefined')
        })
      })
      .then(done).catch(done)
    })
  })

  test('#cardsFor', () => {
    const { cardsFor } = require('../../lib/trello')
    const { configuration } = require('../../lib/trello/configuration')
    let boardId = configuration().boardId

    test('returns all cards of a given board', (done) => {
      assertPromise(cardsFor(boardId)).resolves((cards) => {
        cards.forEach((card) => {
          equal(typeof card, 'object')
          notEqual(typeof card.id, 'undefined')
          notEqual(typeof card.name, 'undefined')
        })
      })
      .then(done).catch(done)
    })

    test('returns the change-list actions within the card', (done) => {
      assertPromise(cardsFor(boardId)).resolves((cards) => {
        cards.forEach((card) => {
          equal(typeof card.actions.length, 'number')
        })
      })
      .then(done).catch(done)
    })
  })
})
