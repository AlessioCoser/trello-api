const {fetchJson} = require('./fetch')
const {cardsFromBoard, actionsFromCard} = require('./urls')

const boardId = process.env.BOARD_ID

const cardActionsRequestsFrom = (card) => {
  return fetchJson(actionsFromCard(card.id))
  .then((actions) => {
    return {card, actions}
  })
}

const toCardActions = (cards) => {
  return Promise.all(cards.map(cardActionsRequestsFrom))
}

const print = (fn) => {
  return (input) => {
    let toPrint = fn(input)
    console.log(toPrint)
    return input
  }
}

const listsMoveActionsText = (cardsActions) => {
  return cardsActions.map((cardActions) => {
    let head = '--------------------------------------\nCard: ' + cardActions.card.name

    let actions = cardActions.actions.map((action) => {
      return action.date + ': ' + action.data.listBefore.name + ' --> ' + action.data.listAfter.name
    })

    return [head, ...actions].join('\n')
  }).join('\n')
}

fetchJson(cardsFromBoard(boardId))
.then(toCardActions)
.then(print(listsMoveActionsText))
.then((cardsActions) => {
  // console.log('--------------------------------------')
  // console.log(cardsActions)
})
.catch(err => console.log(err))
