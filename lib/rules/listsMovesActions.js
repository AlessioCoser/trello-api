const actionToString = (action) => action.date + ': ' + action.data.listBefore.name + ' --> ' + action.data.listAfter.name
const cardTitle = (card) => '--------------------------------------\nCard: ' + card.name

const toText = (cardActions) => {
  let head = cardTitle(cardActions.card)
  let actions = cardActions.actions.map(actionToString)

  return [head, ...actions].join('\n')
}

exports.listsMovesActions = (cardsActions) => {
  return cardsActions.map(toText).join('\n')
}
