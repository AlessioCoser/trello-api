const { configuration } = require('../trello/configuration')

const actionsThatMoves = (card, from, to) => {
  let actions = card.actions.filter((action) => action.listBefore.name === from && action.listAfter.name === to)
  if (actions.length === 0) return null
  return actions
}

const closingDate = (card, config) => {
  let endCycle = (actionsThatMoves(card, config.lists.doing, config.lists.done) || []).pop()
  if (!endCycle) return null

  return new Date(endCycle.date)
}

const hasClosingDate = (card, config) => {
  return !!closingDate(card, config)
}

const startOfWeekDate = (date) => {
  var startOfWeekDate = new Date(date.getTime())
  startOfWeekDate.setDate(date.getDate() - date.getDay() + 1)
  return startOfWeekDate
}

const toDateString = (date) => {
  return date.toISOString().split('T')[0]
}

const startOfWeek = (card, config) => {
  return toDateString(startOfWeekDate(closingDate(card, config)))
}

const orderByKey = (unordered) => {
  const ordered = {}
  Object.keys(unordered).sort().forEach(function (key) {
    ordered[key] = unordered[key]
  })
  return ordered
}

exports.closedByWeek = (cards, config = configuration()) => {
  return cards.reduce((acc, card) => {
    if (!hasClosingDate(card, config)) return acc

    let week = startOfWeek(card, config)
    if (!acc[week]) {
      acc[week] = []
    }
    acc[week].push(card)

    return orderByKey(acc)
  }, {})
}
