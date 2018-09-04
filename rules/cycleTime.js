const actionsThatMoves = (cardActions, from, to) => {
  let actions = cardActions.actions.filter((action) => action.data.listBefore.name === from && action.data.listAfter.name === to)
  if (actions.length === 0) return null
  return actions
}

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length

const differenceFrom = (startCycle, endCycle) => {
  let startDate = new Date(startCycle.date)
  let endDate = new Date(endCycle.date)

  return Math.round((endDate.getTime() - startDate.getTime()) / 1000)
}

exports.cycleTime = (cardsActions) => {
  let cycleTimesInSeconds = cardsActions.reduce((acc, cardActions) => {
    let startCycle = (actionsThatMoves(cardActions, 'TODO', 'DOING') || []).shift()
    let endCycle = (actionsThatMoves(cardActions, 'DOING', 'DONE') || []).pop()

    if (!startCycle || !endCycle) return acc

    acc.push(differenceFrom(startCycle, endCycle))
    return acc
  }, [])

  let avg = average(cycleTimesInSeconds)

  return {avg, cycleTimesInSeconds}
}
