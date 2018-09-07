const { equal, notEqual } = require('assert')
const { cardsFor } = require('../../../lib/trello')
const { configuration: config } = require('../../../lib/trello/configuration')

test('trello', () => {
  test('#cardsFor', () => {
    let boardId = config().boardId

    test('returns all cards of a given board', (done) => {
      cardsFor(boardId)
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
      cardsFor(boardId)
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
