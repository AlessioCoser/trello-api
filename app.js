const {cardsUrl, actionsFromCardUrl} = require('./lib/utils')
const {fetchJson} = require('./lib/fetch')
const {closedByWeeks} = require('./lib/rules/closedByWeeks')
const {listsMovesActions} = require('./lib/rules/listsMovesActions')

const cardActionsRequestsFrom = (card) => {
  return fetchJson(actionsFromCardUrl(card.id))
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

fetchJson(cardsUrl)
.then(toCardActions)
.then(print(closedByWeeks))
.then(print(listsMovesActions))
.then((cardsActions) => {
  console.log('\n~ END ~\n')
})
.catch(err => console.log(err))
