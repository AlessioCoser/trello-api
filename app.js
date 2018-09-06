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

const print = (title, fn) => {
  return (input) => {
    console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log(`~~~ ${title} ~~~`)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n')
    console.log(fn(input))
    return input
  }
}

const countArrayItems = (fn) => {
  return function (input) {
    let resultObject = fn(input)
    let countObject = {}
    Object.keys(resultObject).forEach(function (key) {
      countObject[key] = resultObject[key].length
    })

    return countObject
  }
}

fetchJson(cardsUrl)
.then(toCardActions)
.then(print('List Moves Actions', listsMovesActions))
.then(print('Closed By Weeks Items', closedByWeeks))
.then(print('Closed By Weeks Count', countArrayItems(closedByWeeks)))
.then((cardsActions) => {
  console.log('\n\n~ END ~\n')
})
.catch(err => console.log(err))
