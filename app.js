const {fetchJson} = require('./fetch')

const apiToken = process.env.API_TOKEN
const apiKey = process.env.API_KEY
const boardId = process.env.BOARD_ID

const listsFromBoard = (id) => {
  return `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}`
}

const cardsFromBoard = (id) => {
  return `https://api.trello.com/1/boards/${id}/cards?key=${apiKey}&token=${apiToken}`
}

const cardActions = (id) => {
  return `https://api.trello.com/1/cards/${id}/actions?filter=updateCard:idList&key=${apiKey}&token=${apiToken}`
}

const filterByName = (name) => {
  return (lists) => {
    return lists.filter((list) => list.name === name)
  }
}

const cardActionsRequestsFrom = (card) => {
  return fetchJson(cardActions(card.id))
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
    console.log('--------------------------------------\nCard: ', cardActions.card.name)
    cardActions.actions.forEach((action) => {
      console.log(action.date, ':', action.data.listBefore.name, '-->', action.data.listAfter.name)
    })
  })
})
