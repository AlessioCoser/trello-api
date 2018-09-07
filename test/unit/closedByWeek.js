const { deepEqual } = require('assert')
const { closedByWeek } = require('../../lib/rules/closedByWeek')

test('closedByWeek', () => {
  test('returns empty array if no cards present', () => {
    let cards = closedByWeek([])

    deepEqual(cards, [])
  })

  test('returns empty array if no card is closed', () => {
    let cards = closedByWeek([card(1)])

    deepEqual(cards, [])
  })

  test('returns cards closed grouped by week', () => {
    const SUNDAY_WEEK_ONE = '2018-09-02T00:00:00.000Z'
    const MONDAY_WEEK_ONE = '2018-09-03T00:00:00.000Z'
    const FRIDAY_WEEK_ONE = '2018-09-07T00:00:00.000Z'
    const MONDAY_WEEK_TWO = '2018-09-10T00:00:00.000Z'
    let cards = [
      card(1),
      cardClosedOn(11, SUNDAY_WEEK_ONE),
      cardClosedOn(12, MONDAY_WEEK_ONE),
      cardClosedOn(21, MONDAY_WEEK_TWO),
      cardClosedOn(13, FRIDAY_WEEK_ONE)
    ]

    let closed = closedByWeek(cards)
    deepEqual(Object.keys(closed), ['2018-09-03', '2018-09-10'])
    deepEqual(closed['2018-09-03'].map((card) => card.id), [11, 12, 13])
    deepEqual(closed['2018-09-10'].map((card) => card.id), [21])
  })
})

const list = (name) => ({ name })
const action = (from, to, date) => ({date: new Date(date), listAfter: list(to), listBefore: list(from)})
const card = (id) => ({ id: `${id}`, name: 'first', actions: [] })

const cardClosedOn = (id, closingDate) => {
  let c = card(id)
  c.actions = [action('DOING', 'DONE', closingDate)]
  return c
}
