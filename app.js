const {fetchJson} = require('./fetch')
const {cardsFromBoard, actionsFromCard} = require('./urls')

const {cycleTime} = require('./rules/cycleTime')
const {listsMovesActions} = require('./rules/listsMovesActions')

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
    console.log(fn(input))
    return input
  }
}

fetchJson(cardsFromBoard(boardId))
.then(toCardActions)
.then(print(cycleTime))
.then(print(listsMovesActions))
.then((cardsActions) => {
  console.log('\n~ END ~\n')
})
.catch(err => console.log(err))
