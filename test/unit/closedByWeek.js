const { deepEqual, equal } = require('assert')
const { promise } = require('../utils')

test('ClosedByWeek', () => {
  promise.test('returns empty array if no cards present', () => {
    let fakeCardsFor = () => Promise.resolve([])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    return promise.assert(closedByWeek.get('boardId'))
    .resolves((cards) => deepEqual(cards, []))
  })

  promise.test('returns empty array if no card is closed', () => {
    let fakeCardsFor = () => Promise.resolve([card(1)])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    return promise.assert(closedByWeek.get('boardId'))
    .resolves((cards) => deepEqual(cards, []))
  })

  promise.test('rejects with an error when cannot reach api', () => {
    let fakeCardsFor = () => Promise.reject(new Error('404 not found'))
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    return promise.assert(closedByWeek.get('boardId'))
    .rejects((err) => deepEqual(err.message, '404 not found'))
  })

  promise.test('returns cards closed grouped by week', () => {
    const SUNDAY_WEEK_ONE = '2018-09-02T00:00:00.000Z'
    const MONDAY_WEEK_ONE = '2018-09-03T00:00:00.000Z'
    const FRIDAY_WEEK_ONE = '2018-09-07T00:00:00.000Z'
    const MONDAY_WEEK_TWO = '2018-09-10T00:00:00.000Z'

    let fakeCardsFor = () => Promise.resolve([
      card(1),
      cardClosedOn(11, SUNDAY_WEEK_ONE),
      cardClosedOn(12, MONDAY_WEEK_ONE),
      cardClosedOn(21, MONDAY_WEEK_TWO),
      cardClosedOn(13, FRIDAY_WEEK_ONE)
    ])
    let closedByWeek = ClosedByWeek(fakeCardsFor)

    return promise.assert(closedByWeek.get('boardId'))
    .resolves((closed) => {
      equal(Object.keys(closed), ['2018-09-03', '2018-09-10'])
    })
  })
})

const list = (name) => ({ name })
const action = (from, to, date) => ({date: new Date(date), listAfter: list(to), listBefore: list(from)})
const card = (id) => ({ id: `${id}`, name: 'first', actions: [] })

const cardClosedOn = (id, closingDate) => {
  let c = card(id)
  c.actions = [action('TODO', 'DONE', closingDate)]
  return c
}

const ClosedByWeek = (cardsFor) => {
  return {
    get: (boardId) => cardsFor(boardId).then((cards) => cards.filter((card) => card.actions.length > 0))
  }
}
