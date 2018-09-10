const doingList = 'DOING'
const doneList = 'DONE'

const actionsThatMoves = (card, from, to) => {
  let actions = card.actions.filter((action) => action.listBefore.name === from && action.listAfter.name === to)
  if (actions.length === 0) return null
  return actions
}

const closingDate = (card) => {
  let endCycle = (actionsThatMoves(card, doingList, doneList) || []).pop()
  if (!endCycle) return null

  return new Date(endCycle.date)
}

const hasClosingDate = (card) => {
  return !!closingDate(card)
}

const startOfWeekDate = (date) => {
  var startOfWeekDate = new Date(date.getTime())
  startOfWeekDate.setDate(date.getDate() - date.getDay() + 1)
  return startOfWeekDate
}

const toDateString = (date) => {
  return date.toISOString().split('T')[0]
}

const startOfWeek = (card) => {
  return toDateString(startOfWeekDate(closingDate(card)))
}

const orderByKey = (unordered) => {
  const ordered = {}
  Object.keys(unordered).sort().forEach(function (key) {
    ordered[key] = unordered[key]
  })
  return ordered
}

exports.closedByWeek = (cards) => {
  return cards.reduce((acc, card) => {
    if (!hasClosingDate(card)) return acc

    let week = startOfWeek(card)
    if (!acc[week]) {
      acc[week] = []
    }
    acc[week].push(card)

    return orderByKey(acc)
  }, {})
}
