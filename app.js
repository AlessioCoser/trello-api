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

fetchJson(cardsFromBoard(boardId))
.then(toCardActions)
.then((cardsActions) => {
  return cardsActions.forEach((cardActions) => {
    console.log('--------------------------------------\nCard:', cardActions.card.name)
    cardActions.actions.forEach((action) => {
      console.log(action.date, ':', action.data.listBefore.name, '-->', action.data.listAfter.name)
    })
  })
})
.catch(err => console.log(err))
