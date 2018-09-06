const {cardsUrl, actionsFromCardUrl} = require('./lib/utils')
const {runAllRules, printAllRules} = require('./lib/rules')
const {fetchJson} = require('./lib/fetch')

const cardActionsRequestsFrom = (card) => {
  return fetchJson(actionsFromCardUrl(card.id))
  .then((actions) => {
    return {card, actions}
  })
}

const toCardActions = (cards) => {
  return Promise.all(cards.map(cardActionsRequestsFrom))
}

const print = (title, fn) => {
  return (input) => {
    printTitle(title)
    console.log(fn(input))
    return input
  }
}

// fetchJson(boardsUrl)
// .then((boards) => {
//   console.log(boards.map((board) => board.id + ': ' + board.name))
// })
// .catch(err => console.log(err))

fetchJson(cardsUrl)
.then(toCardActions)
.then(runAllRules)
.then(printAllRules)
.catch(err => console.log(err))
