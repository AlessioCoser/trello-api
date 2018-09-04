exports.listsMovesActions = (cardsActions) => {
  return cardsActions.map((cardActions) => {
    let head = '--------------------------------------\nCard: ' + cardActions.card.name

    let actions = cardActions.actions.map((action) => {
      return action.date + ': ' + action.data.listBefore.name + ' --> ' + action.data.listAfter.name
    })

    return [head, ...actions].join('\n')
  }).join('\n')
}
