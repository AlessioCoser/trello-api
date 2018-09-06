const { fetchJson } = require('../utils/fetch')
const { TrelloConfig } = require('./config')

exports.TrelloApi = (config = TrelloConfig()) => {
  const toBoard = (board) => ({id: board.id, name: board.name})
  const toBoards = (boards) => boards.map(toBoard)

  const toCard = (card) => ({id: card.id, name: card.name, actions: card.actions})
  const toCards = (cards) => cards.map(toCard)

  const toList = (list) => ({ name: list.name, id: list.id })

  const toAction = (action) => ({date: action.date, type: action.type, listAfter: toList(action.data.listAfter), listBefore: toList(action.data.listBefore)})
  const toActions = (actions) => actions.map(toAction)

  const applyActionsToCard = (card) => {
    return fetchJson(`${config.host}/1/cards/${card.id}/actions?filter=updateCard:idList&key=${config.apiKey}&token=${config.apiToken}`)
    .then(toActions)
    .then((actions) => {
      card.actions = actions
      return card
    })
  }

  const addActions = (cards) => {
    return Promise.all(cards.map(applyActionsToCard))
  }

  return {
    myBoards: () => fetchJson(`${config.host}/1/members/${config.username}/boards?key=${config.apiKey}&token=${config.apiToken}`).then(toBoards),
    cardsOf: (boardId) => {
      return fetchJson(`${config.host}/1/boards/${boardId}/cards?key=${config.apiKey}&token=${config.apiToken}`)
      .then(addActions)
      .then(toCards)
    }
  }
}
