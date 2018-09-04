const actionsThatMoves = (cardActions, from, to) => {
  let actions = cardActions.actions.filter((action) => action.data.listBefore.name === from && action.data.listAfter.name === to)
  if (actions.length === 0) return null
  return actions
}

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length

exports.cycleTime = (cardsActions) => {
  let cycleTimesInSeconds = cardsActions.reduce((acc, cardActions) => {
    let startCycle = (actionsThatMoves(cardActions, 'TODO', 'DOING') || []).shift()
    let endCycle = (actionsThatMoves(cardActions, 'DOING', 'DONE') || []).pop()

    if (!startCycle || !endCycle) return acc

    let startDate = new Date(startCycle.date)
    let endDate = new Date(endCycle.date)

    let differenceInseconds = Math.round((endDate.getTime() - startDate.getTime()) / 1000)

    acc.push(differenceInseconds)
    return acc
  }, [])

  let avg = average(cycleTimesInSeconds)

  return {avg, cycleTimesInSeconds}
}
