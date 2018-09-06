const {Config} = require('../utils')

const doingList = Config('DOING_LIST')
const doneList = Config('DONE_LIST')

const actionsThatMoves = (cardActions, from, to) => {
  let actions = cardActions.actions.filter((action) => action.data.listBefore.name === from && action.data.listAfter.name === to)
  if (actions.length === 0) return null
  return actions
}

const closingCardDate = (cardActions) => {
  let endCycle = (actionsThatMoves(cardActions, doingList, doneList) || []).pop()
  if (!endCycle) return null

  return new Date(endCycle.date)
}

const getStartOfWeek = (date) => {
  var startOfWeekDate = new Date(date.getTime())
  startOfWeekDate.setDate(date.getDate() - date.getDay() + 1)
  return startOfWeekDate
}

const toDateString = (date) => {
  return date.toISOString().split('T')[0]
}

const orderByKey = (unordered) => {
  const ordered = {}
  Object.keys(unordered).sort().forEach(function (key) {
    ordered[key] = unordered[key]
  })

  return ordered
}

const closedByWeeks = (cardsActions) => {
  return cardsActions.reduce((acc, cardActions) => {
    let closingDate = closingCardDate(cardActions)

    if (!closingDate) return acc

    let week = toDateString(getStartOfWeek(closingDate))

    if (acc[week]) {
      acc[week].push(cardActions.card)
    } else {
      acc[week] = [cardActions.card]
    }

    return orderByKey(acc)
  }, {})
}

const countClosedByWeeks = (cardActions) => {
  let resultObject = closedByWeeks(cardActions)

  let countObject = {}
  Object.keys(resultObject).forEach(function (key) {
    countObject[key] = resultObject[key].length
  })

  return countObject
}

exports.closedByWeeks = closedByWeeks
exports.countClosedByWeeks = countClosedByWeeks
