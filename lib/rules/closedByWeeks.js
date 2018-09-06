const actionsThatMoves = (cardActions, from, to) => {
  let actions = cardActions.actions.filter((action) => action.data.listBefore.name === from && action.data.listAfter.name === to)
  if (actions.length === 0) return null
  return actions
}

const closingCardDate = (cardActions) => {
  let endCycle = (actionsThatMoves(cardActions, 'DOING', 'DONE') || []).pop()
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

exports.closedByWeeks = (cardsActions) => {
  return cardsActions.reduce((acc, cardActions) => {
    let closingDate = closingCardDate(cardActions)

    if (!closingDate) return acc

    let week = toDateString(getStartOfWeek(closingDate))

    if (acc[week]) {
      acc[week].push(cardActions.card)
    } else {
      acc[week] = [cardActions.card]
    }

    return acc
  }, {})
}
