const { fetchJson } = require('../utils/fetch')
const { TrelloConfig } = require('./config')

exports.TrelloApi = (config = TrelloConfig()) => {
  const urls = {
    actions: (cardId) => `${config.host}/1/cards/${cardId}/actions?filter=updateCard:idList&key=${config.apiKey}&token=${config.apiToken}`,
    boards: () => `${config.host}/1/members/${config.username}/boards?key=${config.apiKey}&token=${config.apiToken}`,
    cards: (boardId) => `${config.host}/1/boards/${boardId}/cards?key=${config.apiKey}&token=${config.apiToken}`
  }

  const toBoard = (board) => ({id: board.id, name: board.name})
  const toBoards = (boards) => boards.map(toBoard)

  const toCard = (card) => ({id: card.id, name: card.name, actions: card.actions})
  const toCards = (cards) => cards.map(toCard)

  const toList = (list) => ({ name: list.name, id: list.id })

  const toAction = (action) => ({date: action.date, type: action.type, listAfter: toList(action.data.listAfter), listBefore: toList(action.data.listBefore)})
  const toActions = (actions) => actions.map(toAction)
  const addActionsTo = (card) => (actions) => { card.actions = actions; return card }
  const applyActionsToCard = (card) => fetchJson(urls.actions(card.id)).then(toActions).then(addActionsTo(card))
  const applyActionsToCards = (cards) => Promise.all(cards.map(applyActionsToCard))

  return {
    myBoards: () => fetchJson(urls.boards()).then(toBoards),
    cardsOf: (boardId) => fetchJson(urls.cards(boardId)).then(applyActionsToCards).then(toCards)
  }
}
